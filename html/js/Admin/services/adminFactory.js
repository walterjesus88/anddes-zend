app.factory('adminFactory', ['httpFactory', '$location', '$q',
function(httpFactory, $location, $q) {
    var datos = {
        uid: '',
        areaid: '',
        estado: '',
    };

    var publico = {
        
        getDatosProyecto: function(proyectoid) {
          var defered = $q.defer();
          var promise = defered.promise;
          httpFactory.getProyectoById(proyectoid)
          .then(function(data) {
            datos = data;
            defered.resolve(datos);
          })
          .catch(function(err) {
            defered.reject(err);
          });
          return promise;      
        },

        setDatosxGuardarxArea: function(nombre,areaid) {
          var defered = $q.defer();
          var promise = defered.promise;     

          httpFactory.setGuardarArea(nombre,areaid)
          .then(function(data) {
            datos = data;
            defered.resolve(datos);
          })
          .catch(function(err) {
            defered.reject(err);
          });
          return promise;      
        },

        setDatosxEliminarxArea: function(areaid) {
          var defered = $q.defer();
          var promise = defered.promise;     

          httpFactory.setEliminarxArea(areaid)
          .then(function(data) {
            datos = data;
            defered.resolve(datos);
          })
          .catch(function(err) {
            defered.reject(err);
          });
          return promise;      
        },

        Usuario: function(uid,nombre_completo,nombre_area,areaid ,estado,codigo_sig) {
            this.uid = uid;
            this.nombre_completo = nombre_completo;
            this.nombre_area = nombre_area;
            this.estado = estado;
            this.areaid = areaid;
            this.codigo_sig = codigo_sig;
            //console.log(this.estado);
            this.cambiarEstadoUsuario = function() {
                httpFactory.setUsuario(this.uid,this.estado,this.areaid)
                    .then(function(data) {
                        alert('Estado del usuario cambiado');
                    })
                    .catch(function(err) {
                        alert('No se pudo cambiar el estado');
                    })
            }
        },
    }
    return publico;
}]);
