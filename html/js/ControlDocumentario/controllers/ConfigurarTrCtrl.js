app.controller('ConfigurarTrCtrl', ['$scope', 'httpFactory', 'transmittalFactory',
'proyectoFactory', '$modal',
function($scope, httpFactory, transmittalFactory, proyectoFactory, $modal) {

  vc = this;
  //obtencion de los datos de configuracion del transmittal
  vc.transmittal = transmittalFactory.getConfiguracion();

  proyectoFactory.getDatosProyecto($scope.$parent.vt.proyecto.codigo)
  .then(function(data) {
    vc.proyecto = data;
    //cargar los datos del transmittal con los datos del proyecto
    vc.transmittal.proyecto = vc.proyecto.codigo;
    vc.transmittal.clienteid = vc.proyecto.clienteid;
    vc.transmittal.cliente = vc.proyecto.cliente;
    vc.transmittal.control_documentario = vc.proyecto.control_documentario;
    vc.transmittal.tipo_proyecto = vc.proyecto.tipo_proyecto;

    vc.control_documentario = vc.transmittal.control_documentario.changeFormat();
    //obtencion del numero correlativo correspondiente a este transmittal
    httpFactory.getCorrelativoTransmittal(vc.transmittal.proyecto)
    .then(function(data) {
      vc.transmittal.correlativo = data.correlativo;
    })
    .catch(function(err) {
      vc.transmittal.correlativo = '';
    })
    listarContactos(data.clienteid);
  })
  .catch(function(err) {
    alert('No se pudo cargar los datos del proyecto');
  });

  /*formatos, tipos de envio y los seleccionados por defecto; arrays de los
  datos a mostrarse en los combobox de contactos y tipo de proyecto*/
  vc.formatos = [];
  vc.tipos_envio = [];
  vc.tipos_proyecto = [];
  vc.contactos = [];

  //funcion para obtener los contactos de un cliente
  var listarContactos = function(clienteid) {
    httpFactory.getContactosByCliente(clienteid)
    .then(function(data) {
      vc.contactos = data;
      //poniendo como atencion al primer contacto de la lista y obteniendo sus datos
      if (vc.contactos.length != 0) {
        vc.transmittal.atencion = vc.contactos[0].contactoid;
        transmittalFactory.setAtencion(vc.transmittal.atencion);
        vc.contactos.forEach(function(contacto) {
          if (contacto.contactoid == vc.transmittal.atencion) {
            vc.datos_contacto_seleccionado.area = contacto.puesto_trabajo;
            vc.datos_contacto_seleccionado.correo = contacto.correo;
          }
        })
      }
    })
    .catch(function(err) {
      vc.contactos = [];
    });
  }


  //obtencion de los datos de tipo de proyectos y tipos de envio

  httpFactory.getTiposProyecto()
  .then(function(data) {
    vc.tipos_proyecto = data;
  })
  .catch(function(err) {
    vc.tipos_proyecto = [];
  });

  httpFactory.getTiposEnvio()
  .then(function(data) {
    vc.formatos = data;
    vc.tipos_envio = data;
  })
  .catch(function(err) {
    vc.formatos = [];
    vc.tipos_envio = [];
  })

  /*inicializando la variable de los datos del contacto seleccionado*/
  vc.datos_contacto_seleccionado = {
    area: '',
    correo: ''
  };

  //cambio del campo codificacion cada vez que este valor es actualizado en la vista
  vc.cambiarCodificacion = function() {
    transmittalFactory.setCodificacion(vc.transmittal.codificacion);
  }

  //cambio del campo dias de alerta cada vez que es cambiado
  vc.cambiarDiasAlerta = function() {
    transmittalFactory.setDiasAlerta(vc.transmittal.dias_alerta);
  }


  //cargar los datos del contacto de acuerdo al contacto seleccionado
  vc.cambiarContacto = function() {
    transmittalFactory.setAtencion(vc.transmittal.atencion);
    vc.contactos.forEach(function(contacto) {
      if (contacto.contactoid == vc.transmittal.atencion) {
        vc.datos_contacto_seleccionado.area = contacto.puesto_trabajo;
        vc.datos_contacto_seleccionado.correo = contacto.correo;
      }
    })
  }

  //guardar los cambios efectuados en la configuracion del transmittal
  vc.guardarConfiguracion = function() {
    transmittalFactory.setConfiguracion(vc.transmittal);
    transmittalFactory.guardarCambios();
  }

  //metodos para mostrar modales de ingreso de datos
  vc.editarContacto = function() {
    var modalInstance = $modal.open({
      animation: true,
      controller: 'ModalContactoCtrl',
      controllerAs: 'mc',
      templateUrl: '/controldocumentario/index/modalcontacto',
      size: 'md',
      resolve: {
        cliente: function () {
          return vc.transmittal.clienteid;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      listarContactos(vc.transmittal.clienteid);
    });
  }

  vc.editarTipoEnvio = function() {
    var modalInstance = $modal.open({
      animation: true,
      controller: 'ModalTipoEnvioCtrl',
      controllerAs: 'mt',
      templateUrl: '/controldocumentario/index/modaltipoenvio',
      size: 'md'
    });
  }

}]);
