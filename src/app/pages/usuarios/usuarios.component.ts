import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  term: string;

  cargando = true;

  constructor( private _usuariosService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ){
    this._modalUploadService.showModal( 'usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuariosService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });

  }

  cambiarDesde( valor: number ){
    let desde = this.desde + valor;

    if( desde >= this.totalRegistros ){
      return;
    }

    if( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuarios( term: string){
    if( term.length > 0){
      this._usuariosService.buscarUsuarios( term )
        .subscribe( 
          resp => {
            this.usuarios = resp;
            console.log(resp);
          }
        );
    } else {
      this.cargarUsuarios();
    }
  }

  borrarUsuario( usuario: Usuario ){
    if( usuario._id === this._usuariosService.usuario._id ){
      swal('Error', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: 'Estas seguro?',
      text: 'Esta acción no tiene vuelta atras!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(( borrar ) => {
      if ( borrar ) {
        this._usuariosService.borrarUsuario( usuario._id )
          .subscribe(
            resp => {
              swal('Poof! El usuario fué borrado!', {
                icon: 'success',
              });
              this.cargarUsuarios();
            }
          );
          
      } else {
        swal('El usuario esta a salvo!');
      }
    });
  }


  guardarUsuario( usuario: Usuario ){

    this._usuariosService.actualizarUsuario( usuario )
      .subscribe(
        resp => {
          console.log(resp);
        }
      );
     
  }

}
