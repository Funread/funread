import React from 'react';
import Modal from './components/Modal';
import Tabs from './components/Tabs';
import Recent from './components/Recent';
import UploadCustom from './components/UploadCustom';
import MyGallery from './components/MyGallery';
import { useUploadMedia } from './hooks/useUploadMedia';
import { TAB_NAMES, TYPE_TABS } from './constants';

export default function UploadMedia({ allowedTypes = ['image'], galleryType = null, show = false, onClose = () => {}, onSelect = () => {} }) {
  const normalized = Array.isArray(allowedTypes) && allowedTypes.length ? allowedTypes : ['image'];
  const tabs = TYPE_TABS.filter(t => normalized.includes(t.key)).map(t => t.key);
  const { state, actions } = useUploadMedia({ allowedTypes: normalized, galleryType });

  if (!show) return null;

  return (
    <Modal title="Insert files" onClose={onClose}>
      <div className="p-4">
        <Tabs
          tabs={[TAB_NAMES.RECENT, TAB_NAMES.UPLOAD_CUSTOM, TAB_NAMES.MY_GALLERY]}
          active={state.activeView}
          onChange={actions.setActiveView}
        />

        <div className="mt-4">
          {state.activeView === TAB_NAMES.RECENT && (
            <Recent files={state.recent} onPick={(f) => { onSelect(f); onClose(); }} allowedTypes={normalized} galleryType={galleryType} />
          )}

          {state.activeView === TAB_NAMES.UPLOAD_CUSTOM && (
            <UploadCustom
              allowedTypes={normalized}
              galleryType={galleryType}
              onUpload={(file) => { actions.addRecent(file); onSelect(file); onClose(); }}
            />
          )}

          {state.activeView === TAB_NAMES.MY_GALLERY && (
            <MyGallery gallery={state.gallery} onPick={(f) => { onSelect(f); onClose(); }} allowedTypes={normalized} galleryType={galleryType} />
          )}
        </div>

        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-gray-200 rounded mr-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
}
