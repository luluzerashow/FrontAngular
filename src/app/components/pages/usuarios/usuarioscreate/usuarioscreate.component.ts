import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { UsuariocreateService } from '../usuariosservicos/usuariocreate.service';
import { UsuariosperfisService } from '../usuariosservicos/usuariosperfis.service';

@Component({
  selector: 'app-usuarioscreate',
  templateUrl: './usuarioscreate.component.html',
  styleUrls: ['./usuarioscreate.component.css']
})
export class UsuarioscreateComponent implements OnInit {

  hide = true;
  mostraralert = false;
  selectedValue: string;
  dataperfilcombo: PerfilComboInterface[];
  public usuarioform: FormGroup;
  user: string;
  senha: string;
  nome: string;
  perfil: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioscreateservice: UsuariocreateService,
    private usuariosperfisservice: UsuariosperfisService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.usuarioform = this.fb.group({
      User: ['', Validators.required],
      Senha: ['', Validators.required],
      Nome: ['', Validators.required],
      Perfil: ['', Validators.required]
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

  Salvar(User: string, Senha: string, Nome: string, Perfilid: number) {
    if (User == '' || Senha == '' || Nome == '' || Perfilid == null) {
      this.mostraralert = true;
    } else {
      // criar metodo save
      this.usuarioscreateservice.Salvar(User, Senha, Nome, Perfilid).subscribe(userresult => {
        if (userresult) {
          //alert("Usuario não cadastrado");
          var title = 'Usuário Cadastrado com sucesso!';
          var description = 'Você cadastrou o usuário: ' + User;
          var buttonclose = true;
          this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
        } else {
          //alert("Usuario não cadastrado");
          var title = 'Erro ao cadastrar usuário';
          var description = 'Se o erro persistir contate o desenvolvedor!' + User;
          var buttonclose = true;
          this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
        }
      }, err => {
        console.log('Erro', err);
      });
    }
  }
}






