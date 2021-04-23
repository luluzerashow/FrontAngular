import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { FaixaeditService } from '../faixasservice/faixaedit.service';

@Component({
  selector: 'app-faixasedit',
  templateUrl: './faixasedit.component.html',
  styleUrls: ['./faixasedit.component.css']
})
export class FaixaseditComponent implements OnInit {

  hide = true;
  mostraralert = false;
  selectedValue: string;

  public faixasform: FormGroup;
  id: number = this.data.Id;
  cor: string = this.data.Cor;
  aulameta: number = this.data.Aula_Meta;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private faixaeditService : FaixaeditService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.faixasform = this.fb.group({
      Nome: [this.cor, Validators.required],
      Aulas_Meta: [this.aulameta, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  Salvar(Nome: string, Aulas_Meta: string) {
    if (Nome == '' || Aulas_Meta == null) {
      this.mostraralert = true;
    } else {
      this.faixaeditService.Salvar(this.id, Nome, Aulas_Meta).subscribe(faixaresult => {
            if (faixaresult) {
              //alert("Usuario não cadastrado");
              var title = 'Faixa editada com sucesso!';
              var description = 'Você editou a faixa: ' + Nome;
              var buttonclose = true;
              this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
            } else {
              //alert("Usuario não cadastrado");
              var title = 'Erro ao editar a faixa';
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
