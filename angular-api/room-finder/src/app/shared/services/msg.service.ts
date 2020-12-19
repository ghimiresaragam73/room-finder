import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr'

@Injectable()

export class MsgService {
    constructor(
        public toastr: ToastrService
    ) {

    }

    showSuccess(msg: string) {
        this.toastr.success(msg);
    }
    showInfo(msg: string) {
        this.toastr.info(msg);
    }
    showWarning(msg: string) {
        this.toastr.warning(msg);
    }
    showError(err: any) {
        debugger;
        if (err.error.message === undefined) {
            if (err.message === undefined) {
                this.toastr.error(err);
                return;
            }
            this.toastr.error(err.message);
        }
        if (err.error.message !== undefined)
            this.toastr.error(err.error.message);
        /* if (err.error.message) {
            console.log('err.error.message ma aayo');
            this.toastr.error(err.error.message);
        } else if (err.message) {
            console.log('err.message ma aayo');
            this.toastr.error(err.message);
        }
        else if(err) {
            console.log('err ma aayo');
            this.toastr.error(err);
        } */
    }
}