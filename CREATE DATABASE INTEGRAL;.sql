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


CREATE TABLE formulario (
    idformulario SERIAL NOT NULL,
    descripcion TEXT NOT NULL,
    permisos JSON NOT NULL,
    PRIMARY KEY(idformulario)
);

INSERT INTO formulario(
	idformulario, descripcion, permisos)
VALUES 
(1, 'Concepto', '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false}'),
(2, 'Cliente', '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false}'),
(3, 'Actividad', '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false}'),
(4, 'Pendiente', '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false}'),
(5, 'Usuario', '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false}');

CREATE TABLE usuario_rol (
    idusuario_rol SERIAL NOT NULL,
    descripcion TEXT NOT NULL,
	PRIMARY KEY(idusuario_rol)
);

INSERT INTO usuario_rol(
	idusuario_rol, descripcion)
VALUES 
(1, 'Administrador'),
(2, 'Tecnicos');

CREATE TABLE usuario_rol_permiso (
    idusuario_rol INT NOT NULL REFERENCES usuario_rol (idusuario_rol) ON UPDATE CASCADE,
    idformulario INT NOT NULL REFERENCES formulario (idformulario) ON UPDATE CASCADE,
    permisos JSON NOT NULL,
     PRIMARY KEY (idusuario_rol, idformulario)
);

CREATE TABLE usuario_rol_detalle (
     idusuario INT NOT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
     idusuario_rol INT NOT NULL REFERENCES usuario_rol (idusuario_rol) ON UPDATE CASCADE,
     PRIMARY KEY(idusuario,idusuario_rol)
);

ALTER TABLE actividad_tecnico_detalle DROP COLUMN precio;

CREATE TABLE pendiente_tecnico (
    idpendiente INT NOT NULL REFERENCES pendiente (idpendiente) ON UPDATE CASCADE,
    idusuario INT NOT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
    PRIMARY KEY (idpendiente, idusuario)
);

----
CREATE TABLE actividad_pendiente (
    idactividad INT NOT NULL REFERENCES actividad (idactividad) ON UPDATE CASCADE,
    idpendiente INT NOT NULL REFERENCES pendiente (idpendiente) ON UPDATE CASCADE,
    PRIMARY KEY (idactividad, idpendiente)
);

ALTER TABLE pendiente ADD COLUMN activo BOOLEAN NOT NULL DEFAULT true;


UPDATE formulario SET 
permisos = '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar": false,"Puede Cambiar Estado": false}'
WHERE idformulario  = 3;
INSERT INTO formulario(
	idformulario, descripcion, permisos)
VALUES 
(6, 'Analytics', '{"Puede listar": false}');


INSERT INTO usuario_rol_permiso(idusuario_rol, idformulario, permisos) VALUES 
(1, 1, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(1, 2, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(1, 3, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true,"Puede Cambiar Estado": true}'),
(1, 4, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar Presupuesto": true, "Puede Listar Servicios": true, "Puede Listar Compras": true, "Puede Listar Relevamientos": true}'),
(1, 5, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(1, 6, '{"Puede listar": true}');

INSERT INTO usuario_rol_permiso(idusuario_rol, idformulario, permisos) VALUES 
(2, 1, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(2, 2, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(2, 3, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true,"Puede Cambiar Estado": false}'),
(2, 4, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar Presupuesto": false, "Puede Listar Servicios": true, "Puede Listar Compras": false, "Puede Listar Relevamientos": false}'),
(2, 5, '{"Puede Registrar": true,"Puede Modificar": true,"Puede Eliminar": true,"Puede Listar": true}'),
(2, 6, '{"Puede listar": false}');

UPDATE formulario
SET  permisos= '{"Puede Registrar": false,"Puede Modificar": false,"Puede Eliminar": false,"Puede Listar Presupuesto": false, "Puede Listar Servicios": false, "Puede Listar Compras": false, "Puede Listar Relevamientos": false}'
WHERE idformulario = 4;

UPDATE estadocobro SET descripcion= 'Facturado' WHERE idestadocobro= 2;
INSERT INTO estadocobro(idestadocobro, descripcion) VALUES (3, 'Cobrado');

CREATE TABLE cliente_cobro (
    idcliente_cobro SERIAL NOT NULL,
    cobrado BOOLEAN NOT NULL,
    descripcion TEXT NULL,
    idcliente INT NOT NULL REFERENCES cliente (idcliente) ON UPDATE CASCADE,
    fechaInsert DATE NOT NULL,
    fechaCobro DATE NULL,
    idusuarioInsert INT NOT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
    idusuarioCobro INT NULL REFERENCES usuario (idusuario) ON UPDATE CASCADE,
    comentario TEXT NULL,
    saldocobrado DOUBLE PRECISION NOT NULL,
    saldoacobrar DOUBLE PRECISION NOT NULL,
    PRIMARY KEY(idcliente_cobro)
);

CREATE TABLE actividad_cobro (
    idcliente_cobro INT NOT NULL REFERENCES cliente_cobro (idcliente_cobro) ON UPDATE CASCADE,
    idactividad INT NOT NULL REFERENCES actividad (idactividad) ON UPDATE CASCADE,
    PRIMARY KEY (idcliente_cobro,idactividad)
);

ALTER TABLE cliente_cobro ADD COLUMN retencion BOOLEAN NOT NULL DEFAULT false;
INSERT INTO estadocobro(idestadocobro, descripcion) VALUES (4, 'Entregado');
ALTER TABLE cliente_cobro ADD COLUMN idestadocobro INT NOT NULL DEFAULT 1 REFERENCES estadocobro (idestadocobro) ON UPDATE CASCADE;
ALTER TABLE cliente_cobro DROP COLUMN cobrado;

CREATE TABLE moneda (
    idmoneda SERIAL NOT NULL,
    descripcion TEXT NOT NULL,
    abreviatura  TEXT NOT NULL,
    PRIMARY KEY (idmoneda)
);
INSERT INTO moneda(idmoneda, descripcion, abreviatura) VALUES (1, 'Guarani', 'GS');
INSERT INTO moneda(idmoneda, descripcion, abreviatura) VALUES (2, 'Dolar', 'USD');

ALTER TABLE concepto ADD COLUMN idmoneda INT NOT NULL DEFAULT 1 REFERENCES moneda (idmoneda) ON UPDATE CASCADE;
ALTER TABLE actividad_concepto_detalle ADD COLUMN idmoneda INT NOT NULL DEFAULT 1 REFERENCES moneda (idmoneda) ON UPDATE CASCADE;