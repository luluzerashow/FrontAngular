import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { PerfileditService } from '../perfisservice/perfiledit.service';

@Component({
  selector: 'app-perfisedit',
  templateUrl: './perfisedit.component.html',
  styleUrls: ['./perfisedit.component.css']
})
export class PerfiseditComponent implements OnInit {

  hide = true;
  mostraralert = false;
  selectedValue: string;

  public perfilform: FormGroup;
  id: number = this.data.Id;
  nome: string = this.data.Nome;
  descricao: number = this.data.Descricao;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private perfileditService : PerfileditService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.perfilform = this.fb.group({
      Nome: [this.nome, Validators.required],
      Descricao: [this.descricao, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  Salvar(Nome: string, Descricao: string) {
    if (Nome == '' || Descricao == null) {
      this.mostraralert = true;
    } else {
      this.perfileditService.Salvar(this.id, Nome, Descricao).subscribe(perfilresult => {
            if (perfilresult) {
              //alert("Usuario não cadastrado");
              var title = 'Perfil editado com sucesso!';
              var description = 'Você editou o perfil: ' + Nome;
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
