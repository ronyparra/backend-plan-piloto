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
    idcliente INT NOT NULL REFERENCES cliente (idcliente) ON UPDATE CASCADE,
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
    idcliente INT NOT NULL REFERENCES cliente (idcliente) ON UPDATE CASCADE,
    idusuario INT NOT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
    idestadocobro INT NOT NULL REFERENCES estadocobro (idestadocobro) ON UPDATE CASCADE,
    solicitante TEXT  NULL,
    comentario TEXT  NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (idactividad)
);

ALTER TABLE actividad DROP CONSTRAINT actividad_idcliente_fkey;
ALTER TABLE actividad ADD COLUMN idcliente_sucursal INT NOT NULL;
ALTER TABLE actividad 
ADD CONSTRAINT actividad_idcliente_fkey FOREIGN KEY (idcliente_sucursal, idcliente)
REFERENCES cliente_sucursal (idcliente_sucursal, idcliente) ON UPDATE CASCADE;

CREATE TABLE actividad_tecnico_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad) ON UPDATE CASCADE,
    idusuario INT NOT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idactividad,idusuario)
);

CREATE TABLE actividad_concepto_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad) ON UPDATE CASCADE,
    idconcepto INT NOT NULL REFERENCES concepto (idconcepto) ON UPDATE CASCADE,
    precio DOUBLE PRECISION NULL,
    cantidad DOUBLE PRECISION NULL,
    PRIMARY KEY (idactividad,idconcepto)
);

CREATE TABLE tipo_pendiente(
    idtipo_pendiente SERIAL NOT NULL,
    descripcion TEXT NOT NULL,
    color TEXT NOT NULL,
    PRIMARY KEY (idtipo_pendiente)
);

CREATE TABLE pendiente (
    idpendiente SERIAL NOT NULL,
    idtipo_pendiente INT NOT NULL REFERENCES tipo_pendiente (idtipo_pendiente) ON UPDATE CASCADE,
    fecha DATE NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (idpendiente)
);

INSERT INTO tipo_pendiente(idtipo_pendiente, descripcion, color, icon)
VALUES (1, 'PRESUPUESTO', 'green', 'post_add'),(2, 'SERVICIO', 'green', 'support_agent'),(3, 'COMPRA', 'green', 'shopping_cart');

ALTER TABLE tipo_pendiente ADD COLUMN icon TEXT NULL;