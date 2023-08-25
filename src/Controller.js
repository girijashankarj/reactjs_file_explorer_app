import FileExplorerView from './components/FileExplorerView/FileExplorerView';
import FooterView from './components/FooterView/FooterView';
import HeaderView from './components/HeaderView/HeaderView';

function Controller() {
  return (
    <>
      <HeaderView />
      <FileExplorerView />
      <FooterView />
    </>
  );
}

export default Controller;
