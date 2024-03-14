
interface Label {
  id: number;
  title: string;
  checked: boolean
}

export type Prefr = "direct-contact" | "passions" | "both";

export type FormItems = {
  contactPref: Prefr;
  funding: boolean;
  pref: Label[];
};
