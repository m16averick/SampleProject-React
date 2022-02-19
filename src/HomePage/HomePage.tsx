import { useEffect, useState, useContext } from "react";
import MainContext from "../_helpers/contexts/mainContext";
import { DataGridEx } from "../_components/DataGridEx/DataGridEx";
import { Column } from "devextreme-react/data-grid";
import { ContractorType } from "../Types/ContractorType";
import { companies } from "./companies";
import { AddContractorPopup } from "./AddContractorPopup";

const HomePage = () => {
  const [addContractorPopupVisible, setAddContractorPopupVisble] =
    useState<boolean>(false);
  const [contractors, setContractors] = useState<ContractorType[]>();
  const { step, setStep } = useContext(MainContext);

  useEffect(() => {
    setContractors(companies);
    if (setStep) setStep("step0");
  }, []);

  const addContractor = (contractor: ContractorType) => {
    if (contractors) setContractors([...contractors, contractor]);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AddContractorPopup
            visible={addContractorPopupVisible}
            setVisible={setAddContractorPopupVisble}
            addContractor={addContractor}
          />
          <DataGridEx
            id="gridContainer"
            selection={{ mode: "single" }}
            dataSource={contractors}
            showBorders={true}
            hoverStateEnabled={true}
            gridTitle="Dane kontrahentów"
            plusFunction={() => setAddContractorPopupVisble(true)}
          >
            <Column dataField="ShortName" caption="Nazwa skrócona" />
            <Column dataField="Nip" caption="Nip" />
            <Column dataField="Kind" caption="Rodzaj" />
            <Column dataField="Type" caption="Typ" />
            <Column dataField="Address" caption="Adres" />
          </DataGridEx>
        </div>
      </div>
    </>
  );
};

export { HomePage };
