import { atom } from "recoil";
import { AlertComp } from '../../components/ui/AlertComp';

export const AlertAtom = atom({
    key: "AlertAtom",
    default: <AlertComp type='info'>Everything is Loaded!</AlertComp>
});

