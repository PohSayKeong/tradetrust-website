import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TOKEN_ACTION_TYPES } from "./../../utils/TokenSuccessUtil";
import { TokenErrorMessage } from "./TokenErrorMessage";

type ErrorType = { type: TOKEN_ACTION_TYPES; message: string };

interface TokenSideBarHolderProps {
  isEqualBeneficiaryAndHolder: boolean;
  approvedBeneficiaryAddress: string;
  newHolder: string;
  handleInputChange: (e: any) => void;
  transferHoldership: () => void;
  changeBeneficiary: () => void;
  surrenderDocument: () => void;
  error: ErrorType | null;
}

const isChangeHolderError = (error: any): error is ErrorType => error?.type === TOKEN_ACTION_TYPES.CHANGE_HOLDER;
const isChangeBeneficiaryError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY;
const isSurrenderDocumentError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT;

const TokenSideBarHolder = ({
  isEqualBeneficiaryAndHolder,
  approvedBeneficiaryAddress,
  handleInputChange,
  newHolder,
  transferHoldership,
  changeBeneficiary,
  surrenderDocument,
  error
}: TokenSideBarHolderProps) => {
  const showChangeBeneficiary = !!approvedBeneficiaryAddress || isEqualBeneficiaryAndHolder;
  const isApprovedBeneficiaryAddress = !!approvedBeneficiaryAddress && !isEqualBeneficiaryAndHolder;

  return (
    <>
      <TokenSideBarField
        id="transferholdership"
        title="Transfer Holdership"
        label="Transfer"
        handleClick={transferHoldership}
      >
        <label>
          <input
            className={`${css["field-input"]} ${isChangeHolderError(error) ? css["is-error"] : ""}`}
            name="newHolder"
            value={newHolder}
            onChange={handleInputChange}
            type="text"
          />
        </label>
        {isChangeHolderError(error) && <TokenErrorMessage errorMessage={error.message} />}
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField
          id="changebeneficiary"
          title="Change Beneficiary"
          label="Change"
          status="success"
          handleClick={changeBeneficiary}
        >
          <label>
            <input
              className={`${css["field-input"]} ${isChangeBeneficiaryError(error) ? css["is-error"] : ""}`}
              type="text"
              name="approvedBeneficiary"
              value={approvedBeneficiaryAddress}
              onChange={handleInputChange}
              disabled={isApprovedBeneficiaryAddress}
            />
          </label>
          {isChangeBeneficiaryError(error) && <TokenErrorMessage errorMessage={error.message} />}
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField
          id="surrenderdocument"
          title="Surrender Document"
          label="Surrender"
          status="danger"
          handleClick={surrenderDocument}
        >
          {isSurrenderDocumentError(error) && <TokenErrorMessage errorMessage={error.message} />}
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
