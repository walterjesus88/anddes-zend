/*Controlador de la vista lista de proyectos, con include de httpFactory para
obtener la lista de proyectos, proyectoFactory para crear objetos de la clase
Proyecto*/

app.controller('ProyectoCtrl', ['httpFactory', 'proyectoFactory', '$location',
function(httpFactory, proyectoFactory, $location) {

  /*referencia del scope y  los arrays que contendra a los proyectos y a los
  integrantes de control documentario*/
  var vp = this;
  var estado_actual = 'A';
  vp.proyectos = [];
  vp.control_documentario = [];

  //funcion para obtener los proyectos del servidor
  var listarProyectos = function(estado) {
    estado_actual = estado;
    httpFactory.getProyectos(estado)
    .then(function(data) {
      vp.proyectos = [];
      data.forEach(function(item) {
        proyecto = new proyectoFactory.Proyecto(item);
        vp.proyectos.push(proyecto);
      });
    })
    .catch(function(err) {
      vp.proyectos = [];
    });
  }

  //carga inicial de integrantes de control documentario
  httpFactory.getIntegrantes()
  .then(function(data) {
    vp.control_documentario = [];
    data.forEach(function(integrante) {
      integrante.nombre = integrante.uid.changeFormat();
      vp.control_documentario.push(integrante);
    })
  })
  .catch(function(err) {
    vp.control_documentario = [];
  });

  httpFactory.getCarpetas()
  .then(function(data) {
    vp.carpetas = data
  })
  .catch(function(err) {
    vp.carpetas = [];
  });

  //carga inicial de los proyectos con estado activo
  listarProyectos(estado_actual);

  //metodo para cargar los proyectos de los diferentes estados
  vp.cargarProyectos = function(estado) {
    listarProyectos(estado);
  }

  vp.exportarToXml = function() {
    window.open('/controldocumentario/json/exportarproyectosxml/estado/' + estado_actual,'_blank');
  }

  vp.imprimir = function() {
    httpFactory.createPdfProyectos(estado_actual)
    .then(function(data) {
      window.open(data.archivo, '_blank');
    })
    .catch(function(err) {

    });
  }

  vp.verInformacion = function(index) {
    $location.path("/transmittal/proyecto/" + vp.proyectos[index].codigo + '/informacion');
    console.log(vp.proyectos[index].codigo);
  }

  vp.accesoDirectoTR = function(index) {
    $location.path("/transmittal/proyecto/" + vp.proyectos[index].codigo + '/generartr');
  }

  vp.accesoDirectoRPT = function(index) {
    $location.path("/transmittal/proyecto/" + vp.proyectos[index].codigo + '/generarrpt');
  }

}]);
