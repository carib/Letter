class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :spots, :type, :spotType
  end
end
