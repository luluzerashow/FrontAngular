import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { FaixacreateService } from '../faixasservice/faixacreate.service';

@Component({
  selector: 'app-faixascreate',
  templateUrl: './faixascreate.component.html',
  styleUrls: ['./faixascreate.component.css']
})
export class FaixascreateComponent implements OnInit {

  hide = true;
  mostraralert = false;
  selectedValue: string;
  public faixasform: FormGroup;
  cor: string;
  aulas_meta: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private faixacreateservice: FaixacreateService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.criarform();
  }
  criarform() {
    this.faixasform = this.fb.group({
      cor: ['', Validators.required],
      aulas_meta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  Salvar(Cor: string, Aulas_Meta: number) {
    if (Cor == '' || Aulas_Meta == null) {
      this.mostraralert = true;
    } else {
      // criar metodo save
      this.faixacreateservice.Salvar(Cor, Aulas_Meta).subscribe(perfilresult => {
        if (perfilresult) {
          //alert("Usuario não cadastrado");
          var title = 'Faixa Cadastrada com sucesso!';
          var description = 'Você cadastrou a faixa: ' + Cor;
          var buttonclose = true;
          this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
        } else {
          //alert("Usuario não cadastrado");
          var title = 'Erro ao cadastrar faixa';
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
