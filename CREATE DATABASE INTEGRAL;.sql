CREATE DATABASE integral;
CREATE TABLE usuario (
    idusuario SERIAL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    PRIMARY KEY(idusuario)
);
ALTER TABLE usuario ADD COLUMN precio DOUBLE PRECISION NOT NULL DEFAULT 80000;

CREATE TABLE cliente(
    idcliente SERIAL,
    razonsocial TEXT NOT NULL,
    ruc TEXT NOT NULL,
    PRIMARY KEY (idcliente)
);

CREATE TABLE cliente_sucursal(
    idcliente INT NOT NULL REFERENCES cliente (idcliente),
    idcliente_sucursal SERIAL,
    descripcion TEXT NOT NULL,
    latitud TEXT NULL,
    longitud TEXT NULL,
    PRIMARY KEY (idcliente, idcliente_sucursal)
);


CREATE TABLE estadocobro(
    idestadocobro SERIAL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY(idestadocobro)
);
INSERT INTO estadocobro(
	idestadocobro, descripcion)
VALUES (1, 'Pendiente'),(2, 'Cobrado');


CREATE TABLE concepto (
    idconcepto SERIAL,
    descripcion TEXT NOT NULL,
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idconcepto)
);


CREATE TABLE actividad (
    idactividad SERIAL,
    idcliente INT NOT NULL REFERENCES cliente (idcliente),
    idusuario INT NOT NULL REFERENCES usuario (idusuario),
    idestadocobro INT NOT NULL REFERENCES estadocobro (idestadocobro),
    solicitante TEXT  NULL,
    comentario TEXT  NULL,
    fecha DATE NOT NULL
    PRIMARY KEY (idactividad)
);

CREATE TABLE actividad_tecnico_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad),
    idusuario INT NOT NULL REFERENCES usuario (idusuario),
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idactividad,idusuario)
);

CREATE TABLE actividad_concepto_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad),
    idconcepto INT NOT NULL REFERENCES concepto (idconcepto),
    precio DOUBLE PRECISION NULL,
    cantidad DOUBLE PRECISION NULL,
    PRIMARY KEY (idactividad,idconcepto)
);
