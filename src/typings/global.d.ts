import { Allusion } from "../AllusionB";

declare global {
    interface Window { _alsn: Allusion }
    interface XMLHttpRequest {
        alsnXHR: boolean;
        originalSend: (body?: Document | BodyInit | null) => void;
    }
}