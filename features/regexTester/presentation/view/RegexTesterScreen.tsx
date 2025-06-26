import { View, Text, ScrollView, StyleSheet, Button, Pressable } from 'react-native';
import { RegexInput } from '../components/RegexInput';
import { TestTextInput } from '../components/TestTextInput';
import { useRegexTesterViewModel } from '../viewmodel/useRegexTesterViewModel';
import { MatchHighlighter } from '../components/MatchHighlighter';
import { generateAST } from '../../domain/usecases/GenerateASTUseCase';
import React, { useEffect, useMemo, useState } from 'react';;
import { RegexExpression } from '../../domain/entities/RegexExpression';
import { useRouter } from 'expo-router';
import { saveRecentExpression } from '../../domain/usecases/SaveRecentExpressionUseCase';
import { useFavoriteRegexStore } from '../../../../app/store/useFavoriteRegexStore';
import { ExpressionSavePanel } from '../../../../shared/components/molecules/ExpresionSavePanel';
import { ASTVisualizer } from '../../../../shared/components/organisms/ASTVisualizer'
import { MatchCount } from '../../../../shared/components/atoms/MatchCount';
import { SaveMessage } from '../../../../shared/components/atoms/SaveMessage';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';
import { ButtonTheme } from '../../../../shared/components/atoms/ButtonTheme';


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
    const router = useRouter();
    const { addFavorite } = useFavoriteRegexStore();
    const [saveMessage, setSaveMessage] = useState('');
    const colors=useThemeColors();




    useEffect(() => {
        if (!expression.trim()) {
            setAst(null);
            setAstError(null);
            return;
        }

        const { ast, error } = generateAST(expression);

        if (ast) {
            setAst(ast);
            setAstError(null);

            // Solo guardar en Zustand si se genera exitosamente el AST
            const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);
            const pattern = match ? match[1] : expression;
            const flags = match ? match[2] : 'g';

            const exprObj = { pattern, flags };
            saveRecentExpression(exprObj); // se guarda en la store solo si el AST es válido

            return;
        }

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
        <ScrollView   style={{ backgroundColor: colors.background }}  contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <ButtonTheme/>

            <Text style={[styles.title, { color: colors.text }]}>Tester de Expresiones Regulares</Text>
            <RegexInput value={expression} onChange={setExpression} />
            <TestTextInput value={testText} onChange={setTestText} />

            {error ? (
                <Text style={styles.error}> Error: {error}</Text>
            ) : (
                <>
                    {/*se importa el atom para encontrar las coincidencias */}
                    <MatchCount count={matches.length} />

                    {/*esto hace que se marquen las coincidencias encontradas */}
                    <MatchHighlighter text={testText} matches={matches} />

                    {/* se importan los botones que hace que se guarde la expresion regular usando SQlite, y  */}
                    {/* el que hace que lo mandemos a la vista de favoritos además de mostrar los mensajes de exito o error*/}
                    <ExpressionSavePanel
                        expression={expression}
                        onSaved={(msg) => {
                            setSaveMessage(msg);
                            setTimeout(() => setSaveMessage(''), 3000);
                        }}
                    />

                    {/*se importa el atomo para visualizar el mensaje de guardado */}
                    <SaveMessage message={saveMessage} />

                    {/*aqui se visualiza el AST */}
                    <ASTVisualizer ast={ast} error={astError} />

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
    button: {
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 10,
        marginBottom: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }


});