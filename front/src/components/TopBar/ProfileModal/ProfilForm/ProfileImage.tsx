import React, { useRef } from "react";
import DropArea from "./DropArea";
import composeRefs from "@seznam/compose-react-refs";
import { useDispatch, batch } from "react-redux";
import { useAppSelector } from '../../../../redux/hooks';
import {
  setUserProfileImageData,
  setUserProfileImageError,
  setUserProfileEdited,
} from "../../../../redux/userProfileSlice";

const ProfileImage = (props: {register: any}) => {
  const { register } = props;
  const inputFile = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { profileModalReadOnly: readOnly } = useAppSelector(
    (state) => state.userProfile
  );


  function FileListItems(file: File) {
    const b = new ClipboardEvent("").clipboardData || new DataTransfer();
    if (file) {
      b.items.add(file);
    }

    return b.files;
  }


  const loadImage = (file: File) => {
    console.log(file)

    if (!file) {
      return false;
    }
    const { size, type } = file;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!fileTypes.includes(type)) {
      dispatch(
        setUserProfileImageError("Veuillez insérer une image (jpg, jpeg, png)")
      );
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      dispatch(setUserProfileImageError("Taille maximum autorisée : 2M"));
      return false;
    }

    const profileInputFile = document.getElementById("fileUpload") as HTMLInputElement;
    profileInputFile.files = new (FileListItems as any)(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (loadEvt) => {
      if (loadEvt?.target) {
        dispatch(setUserProfileImageData(loadEvt.target?.result));
      }
    };

    batch(() => {
      dispatch(setUserProfileImageError(false));
      dispatch(setUserProfileEdited(true));
    });
  };

  return (
    <div>
      <DropArea
        FileListItems={FileListItems}
        loadImage={loadImage}
        inputFile={inputFile}
      />
      <input
        id="fileUpload"
        type="file"
        hidden={true}
        name="fileUpload"
        disabled={readOnly}
        ref={composeRefs(inputFile, register)}
        accept=".png,.jpg,.jpeg"
        onChange={({
          target: {
            validity,
            files
          },
        }) => {
          if (validity.valid && files?.length) {
            loadImage(files[0]);
          }

          return null;
        }}
      />
    </div>
  );
};

export default ProfileImage;
