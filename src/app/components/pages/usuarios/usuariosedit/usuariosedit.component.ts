import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { UsuariosperfisService } from '../usuariosservicos/usuariosperfis.service';
import { UsuarioseditService } from '../usuariosservicos/usuariosedit.service';
import { FormControl } from '@angular/forms';
import { data } from 'jquery';

@Component({
  selector: 'app-usuariosedit',
  templateUrl: './usuariosedit.component.html',
  styleUrls: ['./usuariosedit.component.css']
})
export class UsuarioseditComponent implements OnInit {

  hide = true;
  mostraralert = false;
  selectedValue: string;
  dataperfilcombo: PerfilComboInterface[];
  public usuarioform: FormGroup;

  id: number = this.data.Id;
  user: string = this.data.User;
  nome: string = this.data.Nome;
  perfil: number = this.data.Perfil;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosperfisservice: UsuariosperfisService,
    private usuarioseditService : UsuarioseditService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.usuarioform = this.fb.group({
      User: [this.user, Validators.required],
      Nome: [this.nome, Validators.required],
      Perfil: [this.perfil, Validators.required]
    });
  }

  ngOnInit(): void {
    this.usuariosperfisservice.ComboPerfil().subscribe(
      (perfilcomboretorno: PerfilComboInterface[]) => {
        this.dataperfilcombo = perfilcomboretorno;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  Salvar(User: string, Nome: string, Perfilid: number) {
    if (User == '' || Nome == '' || Perfilid == null) {
      this.mostraralert = true;
    } else {
      this.usuarioseditService.Salvar(this.id, User, Nome, Perfilid).subscribe(userresult => {
            if (userresult) {
              //alert("Usuario não cadastrado");
              var title = 'Usuário editado com sucesso!';
              var description = 'Você editou o usuário: ' + User;
              var buttonclose = true;
              this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
            } else {
              //alert("Usuario não cadastrado");
              var title = 'Erro ao editar usuário';
              var description = 'Se o erro persistir contate o desenvolvedor!';
              var buttonclose = true;
              this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
            }
          }, err => {
            console.log('Erro', err);
          });
    }
  }
}
