import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RegexInput } from '../components/RegexInput';
import { TestTextInput } from '../components/TestTextInput';
import { useRegexTesterViewModel } from '../viewmodel/useRegexTesterViewModel';
import { MatchHighlighter } from '../components/MatchHighlighter';
import { generateAST } from '../../domain/usecases/GenerateASTUseCase';
import { ASTViewer } from '../components/ASTViewer';

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
    const astResult = React.useMemo(() => {
        if (!expression.trim()) return { ast: null, error: null }; //si el input está vacío, no evalúa
        return generateAST(expression);
    }, [expression]);

    const { ast, error: astError } = astResult;

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

                    {/*aqui se visualiza el AST */}
                    <Text style={styles.subtitle}>Árbol de Sintaxis (AST):</Text>
                    {ast ? (
                        /*con esto se visualizan los errores */
                        <ASTViewer ast={ast} />
                    ) : expression.trim() ? (
                        <Text style={styles.error}>No se pudo generar el AST</Text>
                    ) : null}

                    {astError && expression.trim() && (
                        <Text style={styles.error}>Error generando AST: {astError}</Text>
                    )}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
    matches: {
        color: 'green',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
});