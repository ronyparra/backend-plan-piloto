CREATE DATABASE integral;
CREATE TABLE usuario (
    idusuario SERIAL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    PRIMARY KEY(idusuario)
);


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


CREATE TABLE vehiculo(
    idvehiculo SERIAL,
    descripcion TEXT NOT NULL,
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY(idvehiculo)
);

CREATE TABLE estadocobro(
    idestadocobro SERIAL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY(idestadocobro)
);

CREATE TABLE articulo (
    idarticulo SERIAL,
    descripcion TEXT NOT NULL,
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idarticulo)
);

CREATE TABLE unidadservicio(
    idunidadservicio SERIAL,
    descripcion TEXT NOT NULL,
    precio DOUBLE PRECISION NULL,
    PRIMARY KEY (idunidadservicio)
);

CREATE TABLE actividad (
    idactividad SERIAL,
    idcliente INT NOT NULL REFERENCES cliente (idcliente),
    idusuario INT NOT NULL REFERENCES usuario (idusuario),
    idestadocobro INT NOT NULL REFERENCES estadocobro (idestadocobro),
    idunidadservicio INT NOT NULL REFERENCES unidadservicio (idunidadservicio),
    cantidad DOUBLE PRECISION NOT NULL,
    precio DOUBLE PRECISION NOT NULL,
    descripcion TEXT NOT NULL,
    comentario TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    PRIMARY KEY (idactividad)
);

CREATE TABLE actividad_tecnico_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad),
    idtecnico INT NOT NULL REFERENCES tecnico (idtecnico),
    precio DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idactividad,idtecnico)
);

CREATE TABLE actividad_vehiculo_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad),
    idvehiculo INT NOT NULL REFERENCES vehiculo (idvehiculo),
    precio DOUBLE PRECISION NOT NULL,
    distanciakm DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (idactividad,idvehiculo)
);

CREATE TABLE actividad_articulo_detalle (
    idactividad INT NOT NULL REFERENCES actividad (idactividad),
    idarticulo INT NOT NULL REFERENCES articulo (idarticulo),
    precio DOUBLE PRECISION NULL,
    cantidad DOUBLE PRECISION NULL,
    PRIMARY KEY (idactividad,idarticulo)
);
