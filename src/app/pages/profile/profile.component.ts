import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubida: File;
  tempImg: string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ){
    this.usuario.nombre    = usuario.nombre;
    this.usuario.apellidos = usuario.apellidos;

    if( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
  }

  seleccionImagen( archivo: File ){
    if( !archivo ){
      this.imagenSubida = null;
      return;
    }

    if( archivo.type.indexOf('image') === -1 ){
      swal('Solo imágenes', 'El archivo no es una imagen', 'error');
      this.imagenSubida = null;
      return;
    }

    // Lector imágenes
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.tempImg = reader.result;

    this.imagenSubida = archivo;
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubida, this.usuario._id );
  }

}
