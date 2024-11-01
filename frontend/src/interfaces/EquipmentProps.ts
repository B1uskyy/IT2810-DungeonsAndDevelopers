export interface Equipment {
  id: string;
  index: string;
  name: string;
  category: string;
  value: number;
}
export interface EquipmentCardProps {
  equipment: Equipment;
  isChecked: boolean;
  userId: string;
  onChange: (equipId: string, checked: boolean, equipment: Equipment) => void;
  disabled: boolean;
}
