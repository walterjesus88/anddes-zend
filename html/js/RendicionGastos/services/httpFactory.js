app.factory('httpFactory', ['$http','$q', function($http,$q) {

var url_rendir="/rendiciongastos/rendir/";//ruta vista
var url_gastos='/rendiciongastos/gastos/';//ruta controlador gastos

var publico = {

  /*INICIO GASTOS*/
  getGastos: function(estado) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(url_gastos + 'gastosxestado/estado/'+estado)
    .success(function(data) {
      defered.resolve(data);
// console.log(data);

})
    .error(function(err) {
      defered.reject(err);
    });
    return promise;
  },


  setGuardarRendicion: function(numero_completo,nombre,fecha,estado) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(url_gastos + 'guardarrendicion/numero_completo/'+numero_completo+"/nombre/"+nombre+"/fecha/"+fecha+"/estado/"+estado)
    .success(function(data) {
      // console.log(url_gastos + 'guardarrendicion/numero_completo/'+numero_completo+"/nombre/"+nombre+"/fecha/"+fecha+"/estado/"+estado);
      defered.resolve(data);
    })
    .error(function(err) {
      defered.reject(err);
    });
    return promise;
  },

  getGastosById: function(numero) {
    // console.log("httpFactory "+numero);
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(url_gastos + 'rendir/numero/' + numero)
    .success(function(data) {
        // console.log(url_gastos + 'rendirgastos/rendicion/' + numero);
        defered.resolve(data);
      })
    .error(function(err) {
      defered.reject(err);
    });
    return promise;
  },

  /*FIN GASTOS*/

    /*INICIO GASTOS PERSONA*/
    getRendirPersona: function(numero) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(url_gastos + 'llamarrendirpersona/numero/' + numero)
      .success(function(data) {
        defered.resolve(data);

      })
      .error(function(err) {
        defered.reject(err);
      });
      return promise;
    },

    getClientes: function() {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(url_gastos + 'cliente')
      .success(function(data) {
        defered.resolve(data);
        // console.log("httpFactory " + data);
      })
      .error(function(err) {
        defered.reject(err);
      });
      return promise;
    },

    getProyectos: function() {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(url_gastos + 'proyecto')
      .success(function(data) {
        defered.resolve(data);
        // console.log("httpFactory " + data);
      })
      .error(function(err) {
        defered.reject(err);
      });
      return promise;
    },

    getTiposGasto: function() {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(url_gastos + 'tipogastos')
      .success(function(data) {
        defered.resolve(data);
        // console.log("httpFactory " + data);
      })
      .error(function(err) {
        defered.reject(err);
      });
      return promise;
    },

    setGuardarGastos: function(descripcion,gastoid,bill_cliente,reembolsable,fecha_factura,num_factura,moneda,proveedor,monto_igv,otro_impuesto,numero,fecha) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(url_gastos + 'guardargastos/descripcion/'+descripcion+"/gastoid/"+gastoid+"/bill_cliente/"+bill_cliente+"/reembolsable/"+reembolsable+"/fecha_factura/"+fecha_factura+"/num_factura/"+num_factura+"/moneda/"+moneda+"/proveedor/"+proveedor+"/monto_igv/"+monto_igv+"/otro_impuesto/"+otro_impuesto+"/numero/"+numero+"/fecha/"+fecha)
      .success(function(data) {
        defered.resolve(data);

      })
      .error(function(err) {
        defered.reject(err);
      });
      return promise;
    },


}



return publico;
}])