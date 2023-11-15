#version de node a utilizar
FROM node:alpine
#nombre del directorio dentro del contenedor
WORKDIR /app
#copie todos los archivos que comiencen por package y terminen con json
COPY package*.json .
#solo instala todas las dependencias
RUN npm install
#copia todos los archivos del proyecto en el contenedor
COPY . .
#crea una version de produccion solo las dependencias necesarias
RUN npm run build
#expone por que puerto se va a conectar el contenedor
EXPOSE 3000
#actividad/comando/proceso principal a ejecutar
CMD [ "npm", "start" ]