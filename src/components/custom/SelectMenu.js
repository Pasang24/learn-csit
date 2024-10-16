import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectMenu({ items, defaultValue, onChange, className }) {
  return (
    <Select onValueChange={onChange} value={defaultValue}>
      <SelectTrigger className={`${className}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectMenu;
