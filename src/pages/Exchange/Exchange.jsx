import PhocaContainerEx from '@/components/PhocaContainer/PhocaContainerEx';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';

export default function Exchange() {
  return (
    <div>
      Exchange
      <SearchBar name="Exchange" placeholder="포카찾기" bgStyle="bg-zinc-100" />
      <PhocaContainerEx />
      <NavBar />
    </div>
  );
}
