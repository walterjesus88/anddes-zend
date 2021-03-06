<?php
class Admin_Model_DbTable_Transmittal extends Zend_Db_Table_Abstract
{
    protected $_name = 'transmittal';
    protected $_primary = array("codificacion", "correlativo");

     //Lista todos los transmittals procesados
    public function _getAll(){
      try{
        $f = $this->fetchAll();
        if ($f) return $f->toArray ();
        return false;
      }catch (Exception $e){
        print "Error: Al momento de leer todos los transmittal".$e->getMessage();
      }
    }

    //Devuelve la configuracion del ultimo transmittal
    public function _getConfiguracion($proyectoid)
    {
      try {
        $sql = $this->_db->query("select tra.codificacion, tra.correlativo,
        tra.formato, tra.tipo_envio, tra.clienteid, cli.nombre_comercial as cliente,
        tra.control_documentario, tra.atencion, tra.dias_alerta, tra.tipo_proyecto,
        con.puesto_trabajo as area, con.correo from transmittal as tra inner join
        cliente as cli on (tra.clienteid = cli.clienteid) inner join contacto
        as con on (tra.clienteid = con.clienteid and tra.atencion = con.contactoid)
        where proyectoid = '".
        $proyectoid."' order by codificacion desc, correlativo desc limit 1");
        $row = $sql->fetch();
        $correlativo = $this->_getCorrelativo($proyectoid, $row['codificacion']);
        $row['correlativo'] = $correlativo['correlativo'];
        return $row;
      } catch (Exception $e) {
        print $e->getMessage();
      }
    }

    //Devuelve el numero correlativo a asignar al nuevo transmittal
    public function _getCorrelativo($proyectoid, $codificacion)
    {
      try {
        $sql = $this->_db->query("select cast(correlativo as int) from transmittal
        where proyectoid='".$proyectoid."' and codificacion = '".$codificacion."'
        order by correlativo desc limit 1");
        $row = $sql->fetchAll();
        if (count($row) != 0) {
          $numero = (int) $row[0]['correlativo'];
          $cadena = (string) $numero + 1;
          if (strlen($cadena) == 1) {
            $respuesta['correlativo'] = '00'.$cadena;
          } elseif (strlen($cadena) == 2) {
            $respuesta['correlativo'] = '0'.$cadena;
          } elseif (strlen($cadena) == 3) {
            $respuesta['correlativo'] = $cadena;
          }

          return $respuesta;

        } else {
          $respuesta['correlativo'] = '001';
          return $respuesta;
        }

      } catch (Exception $e) {
        print $e->getMessage();
      }

    }

    //Almacena en la base de datos los valores de la configuracion del transmittal
    public function _saveConfiguracion($data)
    {
      try {
        $transmittal = $this->createRow();
        $transmittal->codificacion = $data['codificacion'];
        $transmittal->correlativo = $data['correlativo'];
        $transmittal->clienteid = $data['clienteid'];
        $transmittal->proyectoid = $data['proyectoid'];
        $transmittal->formato = $data['formato'];
        $transmittal->tipo_envio = $data['tipo_envio'];
        $transmittal->control_documentario = $data['control_documentario'];
        $transmittal->dias_alerta = $data['dias_alerta'];
        $transmittal->tipo_proyecto = $data['tipo_proyecto'];
        $transmittal->atencion = $data['atencion'];
        $transmittal->modo_envio = $data['modo_envio'];
        $transmittal->estado_elaboracion = $data['estado_elaboracion'];
        $transmittal->codigo_preferencial = 'CODIGO ANDDES';
        $transmittal->save();
        return $transmittal;
      } catch (Exception $e) {
        print $e->getMessage();
      }
    }

    //Cambia el estado de elaboracion de un transmittal a cerrado
    public function _cambiarEstadoElaboracion($transmittal, $correlativo)
    {
      $row = $this->fetchRow("codificacion = '".$transmittal.
      "' and correlativo = '".$correlativo."'");
      if (!$row) {
           throw new Exception("No hay resultados para ese transmittal");
      }
      $row->estado_elaboracion = 'Emitido';
      $row->save();
      return $row;
    }

    //obtener los datos de un transmittal
    public function _getTransmittal($transmittalid, $correlativo)
    {
      $sql = $this->_db->query("select tra.codificacion, tra.correlativo,
      tra.clienteid, cli.nombre_comercial, tra.proyectoid,
      pro.nombre_proyecto, tra.formato,
      tra.tipo_envio, tra.control_documentario, tra.atencion, tra.codigo_preferencial,
      concat(con.nombre1, ' ', con.ape_paterno) as nombre_atencion,
      con.puesto_trabajo, tra.modo_envio, uni.nombre as unidad_minera
      from transmittal as tra inner join cliente as cli on
      (tra.clienteid = cli.clienteid)
      inner join contacto as con on (tra.atencion = con.contactoid and
      tra.clienteid = con.clienteid)
      inner join proyecto as pro on (tra.proyectoid = pro.proyectoid)
      inner join unidad_minera as uni on (pro.unidad_mineraid = uni.unidad_mineraid)
      where codificacion = '".$transmittalid."' and correlativo ='".$correlativo."'");
      $row = $sql->fetch();
      return $row;
    }

    //guardar el modo de envio
    public function _setModoEnvio($transmittal, $correlativo, $modo)
    {
      try {
        $row = $this->fetchRow("codificacion = '".$transmittal."' and correlativo = '".
        $correlativo."'");
        $row->modo_envio = $modo;
        $row->save();
        $respuesta['resultado'] = 'Guardado';
        return $respuesta;
      } catch (Exception $e) {
        print $e->getMessage();
      }
    }

    public function _updateContacto($codificacion, $correlativo, $contactoid)
    {
      try {
        $transmittal = $this->fetchRow("codificacion = '".$codificacion."' and
        correlativo = '".$correlativo."'");
        $transmittal->atencion = $contactoid;
        $transmittal->save();
        return $transmittal;
      } catch (Exception $e) {
        print $e->getMessage();
      }

    }

    public function _updateCodigoPreferencial($codificacion, $correlativo, $cod_pre)
    {
      try {
        $transmittal = $this->fetchRow("codificacion = '".$codificacion."' and
        correlativo = '".$correlativo."'");
        $transmittal->codigo_preferencial = $cod_pre;
        $transmittal->save();
        return $transmittal;
      } catch (Exception $e) {
        print $e->getMessage();
      }

    }

}
