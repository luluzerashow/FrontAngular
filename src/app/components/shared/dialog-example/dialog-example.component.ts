import { Component, OnInit, HostListener, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
  private dialogRef: MatDialogRef<DialogExampleComponent>){
    dialogRef.disableClose = true;
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

  fechareatualizarpg(){
    location.reload()
    //  var url = location.href;
    // window.location.href = url;
  }
}
