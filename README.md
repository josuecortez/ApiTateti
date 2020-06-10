# Api para catedra Programacion avanzada de un juego tateti

## Intructions to run 
1. Descargar e instalar Node con el siguiente link https://nodejs.org/es/download/
2. Clonar o copiar el proyecto
3. Correr en la terminal `npm install --save`
4. Para correr la api se puede correr con `node server` or `nodemon server`

## HTTP's Request de usuario
### 1.POST /user
1. 1 http request **POST** en la siguiente url http://localhost:3001/user
----
#### Data to send
Example: ejemplo de dato a enviar.
````
{
	"name": "Josue Cortez"
}
````
2. 2 Muestra el id del nuevo usuario
````
5ee15917c3eb175f72c1d044
````
### 2. GET /user 
1. Obtener todos los user **GET**

### 3. GET /user/id
1. Enviar id para obtener el usuario **GET**

## HTTP's Request del tablero
### 1. GET /tablero

1. 1 http request **GET** en la siguiente url http://localhost:3001/tablero
----
#### Data to send HEADER 
Example: enviar con header con el id del usuario para obtener el ultimo tablero del usuario 
````
header a enviar
key = id
value = 5ee15917c3eb175f72c1d044
````

2. 2 Muestra el tablero que quedo ultimo
````
{
    "tableroOcupado": [],
    "tableroMaquina": [],
    "tableroHumano": [],
    "_id": "5edd96b705d36c6261bc62a9",
    "empate": false,
    "ganadorHumano": false,
    "ganadorMaquina": false,
    "cantidadEmpates": 0,
    "cantidadGanadorHumano": 0,
    "cantidadGanadorMaquina": 0,
    "__v": 16
}
````

### 2. POST /tablero/posicion

1. 1 http request **POST** en la siguiente url http://localhost:3001/tablero/posicion
----
#### Data to send  
Example: enviar con header con el id del usuario para obtener el ultimo tablero del usuario ademas de la posicion dentro de la url
````
header a enviar
key = id
value = 5ee15917c3eb175f72c1d044

http: //localhost:3001/tablero/8
````

2. 2 Muestra el tablero con la jugada del humano y la maquina en este caso el humano presiono la celda 8 y la maquina en la celda 9
````
{
    "tableroOcupado": [
        8,
        9
    ],
    "tableroMaquina": [
        9
    ],
    "tableroHumano": [
        8
    ],
    "_id": "5edd96b705d36c6261bc62a9",
    "empate": false,
    "ganadorHumano": false,
    "ganadorMaquina": false,
    "cantidadEmpates": 0,
    "cantidadGanadorHumano": 0,
    "cantidadGanadorMaquina": 0,
    "__v": 16
}
````

### 3. GET /tablero/reiniciar

1. 1 http request **GET** en la siguiente url http://localhost:3001/tablero/reiniciar
----
#### Data to send  
Example: enviar con header con el id del usuario para obtener el ultimo tablero del usuario ademas de la posicion dentro de la url
````
header a enviar
key = id
value = 5ee15917c3eb175f72c1d044

http: //localhost:3001/tablero/reiniciar
````

2. 2 Muestra el tablero reiniciado solamente las celdas, el historial queda igual
````
{
    "tableroOcupado": [],
    "tableroMaquina": [],
    "tableroHumano": [],
    "_id": "5edd96b705d36c6261bc62a9",
    "empate": false,
    "ganadorHumano": false,
    "ganadorMaquina": false,
    "cantidadEmpates": 1,
    "cantidadGanadorHumano": 3,
    "cantidadGanadorMaquina": 2,
    "__v": 16
}
````
### 4. GET /tablero/reiniciarHistorial

1. 1 http request **POST** en la siguiente url http://localhost:3001/tablero/reiniciarHistorial
----
#### Data to send  
Example: enviar con header con el id del usuario para obtener el ultimo tablero del usuario ademas de la posicion dentro de la url
````
header a enviar
key = id
value = 5ee15917c3eb175f72c1d044

http: //localhost:3001/tablero/8
````

2. 2 Muestra el tablero actual pero actualizando el historial de partidas llevando a 0 
````
{
    "tableroOcupado": [
        8,
        9
    ],
    "tableroMaquina": [
        9
    ],
    "tableroHumano": [
        8
    ],
    "_id": "5edd96b705d36c6261bc62a9",
    "empate": false,
    "ganadorHumano": false,
    "ganadorMaquina": false,
    "cantidadEmpates": 0,
    "cantidadGanadorHumano": 0,
    "cantidadGanadorMaquina": 0,
    "__v": 16
}
````
