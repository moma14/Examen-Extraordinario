EXAMEN EXTRAORDINARIO VISUALZADOR Y TESTER DE EXPRESIONES REGULARES

INSTALACIÓN:

Primeramente empezamos con la instalación de dependencias, simplemente empezamos 
con npm install y npm start, no hay alguna otra dependencia que tenga que instalarse
a parte.

ESTRUCTURA DE ARCHIVOS:

La arquitectura que se usó fue MVVM + CLEAN + Feature First + Atomic Design, tengo 3 carpetas raíz, 
la primera es app, en donde tengo mi drawer con sus layout, la segunda es assets,esa viene predeterminada por
react, la tercera es features, y dentro de features tengo regexTester, en donde tengo todos los componentes, hooks,
entities, usecases, views y viewmodel. Y la tercera carpeta es shared adentro de esa tengo mis componentes atoms,
molecules y organisms, tambien tengo hooks y mi carpeta de store para mi logica de zustand, y por ultimo mi carpeta Theme
en donde definí los colores para el modo oscuro. En total tengo 34 archivos, debidamente separados en las carpetas correspondientes 
segun las responsabilidades que tiene cada uno.

USO:

La aplicacion cuenta con 3 vistas, las cuales estan unidas por un drawer, en la vista principal
tenemos 2 inputs, 2 botones y un espacio abajo para la generación del árbol AST.
En los dos inputs, el primero es para las expresiones regulares, y el segundo para el texto a evaluar
segun la expresión que pongamos, la aplicacion no tiene un boton para hacer el calculo, en cuanto
se ponga la expresión se verifica si es valida o si hay algun caracter incorrecto, seguido de esto 
se genera el arbol AST en la parte de abajo, el cual es dinamico, es decir, cuenta con unos botones, que
se despliegan para abajo dependiendo cuántos children tenga el arbol.
En cuanto al segundo input es para el texto a evaluar, simplemente se pone el texto, y si alguna palabra
o número entra en la condición de la expresión abajo de los inputs se verá exactamente la misma frase pero
las palabras que coincidan con la expresión se pintarán de color amarillo. Es en tiempo real, con lo cual 
si se le quita un caracter a la expresión inmediatamente se despintará la palabra y se verá un error que dice 
que la expresión es incorrecta y hasta que no se corrija o cambie la expresión el texto no se pintará. Lo mismo
pasa con el input del texto, si se le desea poner más palabras al input para evaluar si hay coincidencias, en cuánto hayan
coincidencias el texto tambien se pintará inmediatamente o se quitará si las palabras no están completas.

Más abajo encontraremos dos botones, uno para guardar la expresión en favoritos y otro para ir a Favoritos, 
ésta es la segunda vista, si al usuario le gustó alguna expresión puede guardarla en dicha vista para usarla mas tarde,
cabe aclarar que esa vista tiene persistencia con lo cuál, si se reinicia la app, las expresiones que guardemos se 
mantendrán ahí.

Abajo de esos botones tenemos el espacio para el diagrama AST, como dije antes si la expresión es correcta y válida, el
AST se genera automaticamente, y es desplegable, soporta cuantificadores, alternancia etc.

Por ultimo en la parte de arriba de la vista principal tenemos otro botÓn que es para cambiar el tema a modo oscuro, como
parte de los puntos extra se lo puse, se aplica para todas las vistas, incluyendo textos, botones incluso el AST.

Y por ultimo tenemos la ultima vista que es la de Recientes, este es el historial, tambien como parte de los puntos extras.
Ahi se muestran todas las expresiones que el usuario haya usado, mientras una expresión se haya usado en el input y esté correcta, 
se verá automaticamente en esta vista, y como en la vista de favoritos tambien cuenta con persistencia.
