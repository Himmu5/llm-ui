import { Uploader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FC, useState } from 'react';
import { closeUploader, setFile } from '@/store/slices/fileSlice';
import { connect, ConnectedProps } from 'react-redux';
import { CgClose } from 'react-icons/cg';

function previewFile(file: any, callback: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
type P = {} & ReduxProps

const FileUpload: FC<P> = ({ setFile, isFileUploaded, isUploaderOpen, closeUploader }) => {
  const [fileInfo, setFileInfo] = useState(null);
  return (
    <>
      <AlertDialog open={isUploaderOpen || !isFileUploaded}>
        <AlertDialogContent>
          {isUploaderOpen && <div className='flex items-center justify-between'>
            <div></div>
            <div><CgClose className='cursor-pointer' onClick={() => closeUploader()} /></div>
          </div>}
          <AlertDialogHeader>
            <AlertDialogTitle>Please upload a file to Investigate?</AlertDialogTitle>
            <Uploader
              onSuccess={(e) => {
                setFile(e.filename)
              }}
              onUpload={(e) => {
                previewFile(e.blobFile, (value: any) => {
                  setFileInfo(value);
                })
              }} action="http://localhost:8000/llm/upload" draggable>
              <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Click or Drag files to this area to upload</span>
              </div>
            </Uploader>
          </AlertDialogHeader>
          {/* <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Upload</AlertDialogAction>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const mapDispatchToProps = {
  setFile,
  closeUploader
};
const mapStateToProps = (state: any) => {
  return {
    isFileUploaded: state.file.isFileUpload,
    isUploaderOpen: state.file.isUploaderOpen
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(FileUpload)