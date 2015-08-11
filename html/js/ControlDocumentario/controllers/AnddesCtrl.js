app.controller('AnddesCtrl', ['httpFactory', 'entregableFactory', '$scope',
'transmittalFactory',
function(httpFactory, entregableFactory, $scope, transmittalFactory) {

  va = this;

  //obteniendo el codigo del proyecto del scope padre
  var proyecto = $scope.$parent.vt.proyecto;

  //array que contendra la lista de entregables de los proyectos
  va.entregables = [];

  //cargar los entregables
  var listarEntregables = function(proyecto, estado) {
    httpFactory.getEntregables(proyecto, estado)
    .then(function(data) {
      va.entregables = [];
      data.forEach(function(item) {
        entregable = new entregableFactory.Entregable(item.detalleid, item.edt,
        item.tipo_documento, item.disciplina, item.codigo_anddes, item.codigo_cliente,
        item.descripcion_entregable, item.revision, item.estado_revision, item.transmittal,
        item.correlativo, item.emitido, item.fecha);
        va.entregables.push(entregable);
      })
    })
    .catch(function(err) {
      va.entregables = [];
    });
  }

  va.tabla_activa = 'active';
  va.trans_activo = '';

  var cambiarSubPanel = function(panel) {
    if (panel == 'tablas') {
      va.tabla_activa = 'active';
      va.trans_activo = '';
    } else if (panel == 'trans') {
      va.tabla_activa = '';
      va.trans_activo = 'active';
    }
  }


  listarEntregables(proyecto.codigo, 'Ultimo');
  //array que contendra la lista de edts por proyecto
  va.edt = [];

  //cargar los edt
  httpFactory.getEdts(proyecto.codigo)
  .then(function(data){
    va.edt = data;
  })
  .catch(function(err) {
    va.edt = [];
  });

  //estado de los paneles de la vista
  va.edt_activo = '';
  va.tecnicos_activo = 'active';
  va.gestion_activo = '';
  va.comunicacion_activo = '';

  //cambio de panel visible segun menu seleccionado
  va.cambiarPanel = function(panel) {
    if (panel == 'edt') {
      va.edt_activo = 'active';
      va.tecnicos_activo = '';
      va.gestion_activo = '';
      va.comunicacion_activo = '';
    } else if (panel == 'tecnicos') {
      va.edt_activo = '';
      va.tecnicos_activo = 'active';
      va.gestion_activo = '';
      va.comunicacion_activo = '';
    } else if (panel == 'gestion') {
      va.edt_activo = '';
      va.tecnicos_activo = '';
      va.gestion_activo = 'active';
      va.comunicacion_activo = '';
    } else if (panel == 'comunicacion') {
      va.edt_activo = '';
      va.tecnicos_activo = '';
      va.gestion_activo = '';
      va.comunicacion_activo = 'active';
    }
  }

  //cambio de datos cargados de entregables
  va.cargarRevisiones = function(estado) {
    listarEntregables(proyecto.codigo, estado);
    cambiarSubPanel('tablas');
  }

  //vista de edicion de transmittal
  va.editarTransmittal = function() {
    cambiarSubPanel('trans');
  }
}]);