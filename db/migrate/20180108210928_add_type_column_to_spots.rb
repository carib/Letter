class AddTypeColumnToSpots < ActiveRecord::Migration[5.1]
  def change
    add_column :spots, :type, :string
  end
end
