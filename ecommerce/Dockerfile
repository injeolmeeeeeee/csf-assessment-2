FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

RUN npm ci && ng build


FROM maven:eclipse-temurin AS sb-builder

WORKDIR /sbapp

COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY src src
COPY pom.xml .
COPY --from=ng-builder ngapp/dist/client-side/browser src/main/resources/static

RUN mvn package -Dmaven.test.skip=true

# Publish stage

FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV SPRING_DATA_MONGODB_URI= SPRING_DATASOURCE_URL=
ENV PORT=8080

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar