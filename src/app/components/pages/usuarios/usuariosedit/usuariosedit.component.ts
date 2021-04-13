import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { UsuariosperfisService } from '../usuariosservicos/usuariosperfis.service';
import { FormControl } from '@angular/forms';

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
  user = new FormControl('');
  senha: string;
  nome: string;
  perfil: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosperfisservice: UsuariosperfisService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
    this.user.setValue('Nancy');
    //this.usuarioform.setValue({'User':this.data.user, 'Nome': this.data.user, 'Perfil': this.data.user})
  }
  criarform() {
    this.usuarioform = this.fb.group({
      User: ['', Validators.required],
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

  Salvar(User: string, Nome: string, Perfilid: number) {
    // if (User == '' || Senha == '' || Nome == '' || Perfilid == null) {
    //   this.mostraralert = true;
    // } else {
    //   // criar metodo save
    //   this.usuarioscreateservice.Salvar(User, Senha, Nome, Perfilid).subscribe(userresult => {
    //     if (userresult) {
    //       //alert("Usuario não cadastrado");
    //       var title = 'Usuário Cadastrado com sucesso!';
    //       var description = 'Você cadastrou o usuário: ' + User;
    //       var buttonclose = true;
    //       this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
    //     } else {
    //       //alert("Usuario não cadastrado");
    //       var title = 'Erro ao cadastrar usuário';
    //       var description = 'Se o erro persistir contate o desenvolvedor!' + User;
    //       var buttonclose = true;
    //       this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
    //     }
    //   }, err => {
    //     console.log('Erro', err);
    //   });
    // }
  }

}
