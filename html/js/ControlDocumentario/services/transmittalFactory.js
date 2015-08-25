/*servicio Factory para configurar datos de Transmittal con include de
httpFactory para poder enviar los datos de configuracion al servidor*/
app.factory('transmittalFactory', ['httpFactory', function(httpFactory) {

  var datos = {
    codificacion: '',
    correlativo: '',
    formato: 'ANDDES',
    tipo_envio: 'ANDDES',
    proyecto: '',
    clienteid: '',
    cliente: '',
    control_documentario: '',
    atencion: '',
    dias_alerta: '',
    area: '',
    tipo_proyecto: '',
    correo: '',
    modo_envio: 'F'
  };

  var transmittal = {
    codigo: '',
    entregables: []
  };

  var publico = {
    getConfiguracion: function() {
      return datos;
    },

    setConfiguracion: function(transmittal) {
      datos.codificacion = transmittal.codificacion;
      datos.formato = transmittal.formato;
      datos.tipo_envio = transmittal.tipo_envio;
      datos.clienteid = transmittal.clienteid;
      datos.cliente = transmittal.cliente;
      datos.control_documentario = transmittal.control_documentario;
      datos.atencion = transmittal.atencion;
      datos.dias_alerta = transmittal.dias_alerta;
      datos.area = transmittal.area;
      datos.tipo_proyecto = transmittal.tipo_proyecto;
      datos.correo = transmittal.correo;
      datos.logo = transmittal.logo;
      datos.modo_envio = transmittal.modo_envio;
    },

    setCodificacion: function(codificacion) {
      datos.codificacion = codificacion;
    },
    setFormato: function(formato) {
      datos.formato = formato;
    },
    setTipoEnvio: function(tipo_envio) {
      datos.tipo_envio = tipo_envio;
    },
    getProyecto: function() {
      return datos.proyecto;
    },
    setProyecto: function(proyecto) {
      datos.proyecto = proyecto;
    },
    setClienteId: function(clienteid) {
      datos.clienteid = clienteid;
    },
    setCliente: function(cliente) {
      datos.cliente = cliente;
    },
    setControlDocumentario: function(control_documentario) {
      datos.control_documentario = control_documentario;
    },
    setAtencion: function(atencion) {
      datos.atencion = atencion;
    },
    setDiasAlerta: function(dias_alerta) {
      datos.dias_alerta = dias_alerta;
    },
    setArea: function(area) {
      datos.area = area;
    },
    setTipoProyecto: function(tipo_proyecto) {
      datos.tipo_proyecto = tipo_proyecto;
    },
    setCorreo: function(correo) {
      datos.correo = correo;
    },
    setModoEnvio: function(modo_envio) {
      datos.modo_envio = modo_envio;
      httpFactory.setModoEnvio(datos.codificacion, datos.correlativo, datos.modo_envio)
      .then(function(data) {
        alert('Tipo de envio guardado');
      })
      .catch(function(err) {
        alert('No se pudo guardar el tipo de envio');
      });
    },

    guardarCambios: function() {
      httpFactory.setConfiguracionTransmittal(datos)
      .then(function(data) {
        alert('Cambios guardados satisfactoriamente');
      })
      .catch(function(err) {
        alert('Error al guardar cambios, intentelo denuevo');
      });
    },
    obtenerDatos: function() {
      alert('hola');
    },


    agregarEntregable: function(entregable) {
      transmittal.entregables.push(entregable);
    },
    eliminarEntregable: function(entregableid) {
      var temp = [];
      for (var i = 0; i < transmittal.entregables.length; i++) {
        if (transmittal.entregables[i].codigo != entregableid) {
          temp.push(transmittal.entregables[i]);
        }
      }
      transmittal.entregables = temp;
    },
    guardarTransmittal: function() {
      //peticiones al servidor para guardar los entregables asociados al transmittal
    },
    emitirTransmittal: function() {
      //cambiar el estado a emitido haciendo imposible la modificacion o agregar entregables
    },
    reenviarTransmittal: function() {
      //retomar los valores de este transmittal para generar otro con estado en elaboracion
    },
    imprimirTransmittal: function() {
      httpFactory.createPdfTR(datos.codificacion, datos.correlativo)
      .then(function(data) {
        window.open(data.archivo, '_blank');
      })
      .catch(function(err) {

      });
    }

  }

  return publico;
}]);
