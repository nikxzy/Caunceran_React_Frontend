import './App.css';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Counter from './components/ui/Counter';
import List from './components/ui/List';

function App() {
  return (
    <>
      <Card 
      name="Anika Belle" />
      <Button />
      <Card 
        name="Niks" 
        description="This is me again." 
      />
      <Counter />
      
      <List />
    </>
  );
}

export default App;