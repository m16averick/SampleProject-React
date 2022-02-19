import React, { useReducer, FC } from "react";
import { PopupEx } from "../_components/PopupEx/PopupEx";
import { FormField } from "../_components/FormField/FormField";
import { TextBox } from "devextreme-react";
import { Button } from "devextreme-react/button";
import { ContractorType } from "../Types/ContractorType";
import ValidationEngine from "devextreme/ui/validation_engine";
import notify from "devextreme/ui/notify";

import {
  Validator,
  RequiredRule,
} from "devextreme-react/validator";

interface IAddProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addContractor: (contractor: ContractorType) => void;
}

const initialState = {
  ShortName: "",
  Nip: "",
  Kind: "",
  Type: "",
  Address: "",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "toggle_remember":
      return {
        ...state,
        remember: !state.remember,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const AddContractorPopup: FC<IAddProps> = ({
  visible,
  setVisible,
  addContractor,
}: IAddProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validationGroup = "AddContractor";
  const validate = () => {
    let { brokenRules } = ValidationEngine.validateGroup(validationGroup);
    if (brokenRules && brokenRules.length > 0) {
      notify("Uzupełnij wymagane pola!", "error");
      return false;
    }
    return true;
  };

  const save = () => {
    if (validate()) {
      let contractor = {
        ShortName: state.ShortName,
        Nip: state.Nip,
        Kind: state.Kind,
        Type: state.Type,
        Address: state.Address,
      } as ContractorType;
      dispatch({ type: "reset" });
      setVisible(false);
      addContractor(contractor);
    }
  };
  const handleContentReady = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <FormField
          label={"Nazwa skrócona"}
          input={
            <TextBox
              width="250"
              value={state.ShortName}
              onValueChanged={(e) => {
                dispatch({
                  type: "update_input",
                  value: e.value,
                  key: "ShortName",
                });
              }}
            >
              <Validator validationGroup={validationGroup}>
                <RequiredRule message="Nazwa skrócona jest wymagana" />
              </Validator>
            </TextBox>
          }
        />
        <FormField
          label={"Nip"}
          input={
            <TextBox
              width="250"
              value={state.Nip}
              onValueChanged={(e) => {
                dispatch({ type: "update_input", value: e.value, key: "Nip" });
              }}
            >
              {" "}
              <Validator validationGroup={validationGroup}>
                <RequiredRule message="Nip jest wymagany" />
              </Validator>
            </TextBox>
          }
        />
        <FormField
          label={"Rodzaj"}
          input={
            <TextBox
              width="250"
              value={state.Kind}
              onValueChanged={(e) => {
                dispatch({ type: "update_input", value: e.value, key: "Kind" });
              }}
            >
              {" "}
              <Validator validationGroup={validationGroup}>
                <RequiredRule message="Rodzaj jest wymagany" />
              </Validator>
            </TextBox>
          }
        />
        <FormField
          label={"Typ"}
          input={
            <TextBox
              width="250"
              value={state.Type}
              onValueChanged={(e) => {
                dispatch({ type: "update_input", value: e.value, key: "Type" });
              }}
            >
              <Validator validationGroup={validationGroup}>
                <RequiredRule message="Typ jest wymagany" />
              </Validator>
            </TextBox>
          }
        />
        <FormField
          label={"Adres"}
          input={
            <TextBox
              width="250"
              value={state.Address}
              onValueChanged={(e) => {
                dispatch({
                  type: "update_input",
                  value: e.value,
                  key: "Address",
                });
              }}
            >
              <Validator validationGroup={validationGroup}>
                <RequiredRule message="Adres jest wymagany" />
              </Validator>
            </TextBox>
          }
        />
      </div>
    );
  };
  const popupButtons = () => {
    return (
      <Button
        text="Zapisz"
        type="success"
        stylingMode="contained"
        className="btnPrimary"
        onClick={() => save()}
      />
    );
  };
  return (
    <>
      <PopupEx
        visible={visible}
        onHiding={() => {
          dispatch({ type: "reset" });
          setVisible(false);
        }}
        content={handleContentReady()}
        width="600"
        height="auto"
        title="Dodaj kontrahenta"
        buttons={popupButtons()}
      />
    </>
  );
};

export { AddContractorPopup };
