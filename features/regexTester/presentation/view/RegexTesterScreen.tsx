import { View, Text, ScrollView, StyleSheet, Button, Pressable } from 'react-native';
import { RegexInput } from '../components/RegexInput';
import { TestTextInput } from '../components/TestTextInput';
import { useRegexTesterViewModel } from '../viewmodel/useRegexTesterViewModel';
import { MatchHighlighter } from '../components/MatchHighlighter';
import { generateAST } from '../../domain/usecases/GenerateASTUseCase';
import React, { useEffect, useMemo, useState } from 'react';;
import { ASTTreeViewer } from '../components/ASTTreeViewer';
import { RegexStorageSQLite } from '../../data/local/RegexStorageSQLite';
import { RegexExpression } from '../../domain/entities/RegexExpression';
import { useRouter } from 'expo-router';
import { saveRecentExpression } from '../../domain/usecases/SaveRecentExpressionUseCase';



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
    const router = useRouter();



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
                    <Pressable
                        style={styles.button}
                        onPress={async () => {
                            try {
                                if (!expression.trim()) return;
                                const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);
                                const pattern = match ? match[1] : expression;
                                const flags = match ? match[2] : 'g';

                                const exprObj = { pattern, flags };

                                await RegexStorageSQLite.save(exprObj); // guardar en SQLite
                                saveRecentExpression(exprObj);           // guardar en Zustand solo si el usuario lo decide

                                setSaveMessage('Expresión guardada');
                                setTimeout(() => setSaveMessage(''), 3000);
                            } catch (err) {
                                setSaveMessage(' Error al guardar');
                                setTimeout(() => setSaveMessage(''), 3000);
                            }
                        }}
                    ><Text style={styles.buttonText}>Guardar Expresión</Text></Pressable>

                    <Pressable
                       style={styles.button} 
                        onPress={() => router.push('/(drawer)/Recientes')}
                    ><Text style={styles.buttonText}>Mostrar expresiones guardadas</Text></Pressable>

                    {/*se muestra el mensaje de Expresion guardada o error al guardar, al presionar el bton */}
                    {saveMessage !== '' && (
                        <Text style={styles.info}>{saveMessage}</Text>
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
        paddingTop: 30,
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
        fontSize: 20,
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
    button:{
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 10,
        marginBottom: 2,
    },
    buttonText:{
        color:'white',
        fontSize:18,
    }


});