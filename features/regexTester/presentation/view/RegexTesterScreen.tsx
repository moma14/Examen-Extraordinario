import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { RegexInput } from '../components/RegexInput';
import { TestTextInput } from '../components/TestTextInput';
import { useRegexTesterViewModel } from '../viewmodel/useRegexTesterViewModel';
import { MatchHighlighter } from '../components/MatchHighlighter';
import { generateAST } from '../../domain/usecases/GenerateASTUseCase';
import React, { useEffect, useMemo, useState } from 'react';;
import { ASTTreeViewer } from '../components/ASTTreeViewer';
import { RegexStorageSQLite } from '../../data/local/RegexStorageSQLite';
import { RegexExpression } from '../../domain/entities/RegexExpression';



export const RegexTesterScreen = () => {
    const {
        expression,
        testText,
        setExpression,
        setTestText,
        matches,
        error,
    } = useRegexTesterViewModel();
    // con esto se genera el AST, que es en tiempo real según la expresión
    const [ast, setAst] = useState<any | null>(null);
    const [astError, setAstError] = useState<string | null>(null);

    const [savedExpressions, setSavedExpressions] = useState<RegexExpression[]>([]);
    const [saveMessage, setSaveMessage] = useState('');


    useEffect(() => {
        if (!expression.trim()) {
            setAst(null);
            setAstError(null);
            return;
        }
        const { ast, error } = generateAST(expression);
        //  Si la expresión es válida, guarda el AST y limpia el error
        if (ast) {
            setAst(ast);
            setAstError(null);
            return;
        }

        //  Si hay error, lo muéstra temporalmente
        if (error) {
            setAst(null);
            setAstError(error);

            const timer = setTimeout(() => {
                setAstError(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [expression]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Tester de Expresiones Regulares</Text>
            <RegexInput value={expression} onChange={setExpression} />
            <TestTextInput value={testText} onChange={setTestText} />

            {error ? (
                <Text style={styles.error}> Error: {error}</Text>
            ) : (
                <>
                    <Text style={styles.matches}>
                        Coincidencias encontradas: {matches.length}
                    </Text>

                    {/*esto hace que se marquen las coincidencias encontradas */}
                    <MatchHighlighter text={testText} matches={matches} />

                    {/*este boton hace que se guarde la expresion regular en la tabla que pusimos */}
                    {/*usando SQlite */}
                       <Button
                        title="Guardar Expresión"
                        onPress={async () => {
                            try {
                                if (!expression.trim()) return;
                                const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);
                                const pattern = match ? match[1] : expression;
                                const flags = match ? match[2] : 'g';

                                await RegexStorageSQLite.save({ pattern, flags });
                                setSaveMessage('Expresión guardada');
                            } catch (err) {
                                setSaveMessage(' Error al guardar');
                            }
                        }}
                    />
                    {/*y aqui me consulta las expresiones que guarde en la tabla */}
                    <Button
                        title="Mostrar expresiones guardadas"
                        onPress={async () => {
                            const data = await RegexStorageSQLite.getAll();
                            setSavedExpressions(data);
                        }}
                    />
                    {/*estos mensajes los muestra si se guardo bien la expresion o si hubo algun error */}
                    {saveMessage !== '' && <Text style={styles.info}>{saveMessage}</Text>}

                    {savedExpressions.length > 0 && (
                        <>
                            <Text style={styles.subtitle}>Expresiones guardadas:</Text>
                            {savedExpressions.map((item, idx) => (
                                <Text key={idx} style={styles.savedItem}>
                                    /{item.pattern}/{item.flags}
                                </Text>
                            ))}
                        </>
                    )}
                    
                    {/*aqui se visualiza el AST */}
                    <Text style={styles.subtitle}>Árbol de Sintaxis (AST):</Text>
                    {ast ? (
                        <ASTTreeViewer ast={ast} />
                    ) : null}

                    {astError && (
                        <Text style={styles.error}>Error generando AST: {astError}</Text>
                    )}

                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        padding: 30,
        gap: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
    matches: {
        color: 'green',
        fontSize: 18,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    info: {
        color: 'blue',
        fontSize: 14,
    },
    savedItem: {
        fontSize: 14,
        paddingVertical: 4,
        color: '#444',
    },


});