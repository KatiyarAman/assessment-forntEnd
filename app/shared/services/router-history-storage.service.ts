import { Injectable } from '@angular/core';

const HISTORY_STACK_KEY = "history_stack";
const BACK_BUTTON_KEY = "back_button_pressed";
const CURRENT_PAGE_URL_KEY = "current_page";

@Injectable({
    providedIn: 'root'
})
export class RouterHistoryStorageService {

    private getHistoryFromLocationStorage() : string[] {
        return JSON.parse(window.sessionStorage.getItem(HISTORY_STACK_KEY)) || [];
    }

    private saveHistoryToLocationStorage(history: string[]) : void {
        window.sessionStorage.setItem(HISTORY_STACK_KEY, JSON.stringify(history));
    }

    pushUrl(url: string) : void {
        let history: string[] = this.getHistoryFromLocationStorage();
        history.push(url);
        this.saveHistoryToLocationStorage(history);
    }

    popUrl() : string {
        let history = this.getHistoryFromLocationStorage();
        if (history.length != 0) {
            let url = history.pop();
            this.saveHistoryToLocationStorage(history);
            return url;
        }
        // if no history is found return to index
        return null;
    }

    getReturnURL() : string {
        return JSON.parse(window.sessionStorage.getItem('returnUrl'));
    }

    setBackButtonStatus(state: boolean) {
        window.sessionStorage.setItem(BACK_BUTTON_KEY, JSON.stringify(state));
    }

    getBackButtonStatus() : boolean {
        return JSON.parse(window.sessionStorage.getItem(BACK_BUTTON_KEY)) || false;
    }

    emptyLocalStorageHistory() {
        window.sessionStorage.removeItem(HISTORY_STACK_KEY);
    }

    setCurrentPage(url) {
        console.log(url)
        window.sessionStorage.setItem(CURRENT_PAGE_URL_KEY, JSON.stringify(url));
    }

    getCurrentPage() : string {
        return JSON.parse(window.sessionStorage.getItem(CURRENT_PAGE_URL_KEY));
    }
}