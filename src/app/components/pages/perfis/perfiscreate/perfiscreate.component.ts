import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { PerfilcreateService } from '../perfisservice/perfilcreate.service';

@Component({
  selector: 'app-perfiscreate',
  templateUrl: './perfiscreate.component.html',
  styleUrls: ['./perfiscreate.component.css']
})
export class PerfiscreateComponent implements OnInit {


  hide = true;
  mostraralert = false;
  selectedValue: string;
  public perfilform: FormGroup;
  nome: string;
  descricao: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private perfilcreateservice: PerfilcreateService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.perfilform = this.fb.group({
      Nome: ['', Validators.required],
      Descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  Salvar(Nome: string, Descricao: string) {
    if (Nome == '' || Descricao == null) {
      this.mostraralert = true;
    } else {
      // criar metodo save
      this.perfilcreateservice.Salvar(Nome, Descricao).subscribe(perfilresult => {
        if (perfilresult) {
          //alert("Usuario não cadastrado");
          var title = 'Usuário Cadastrado com sucesso!';
          var description = 'Você cadastrou o usuário: ' + Nome;
          var buttonclose = true;
          this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
        } else {
          //alert("Usuario não cadastrado");
          var title = 'Erro ao cadastrar usuário';
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
