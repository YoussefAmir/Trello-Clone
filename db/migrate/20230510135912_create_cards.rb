class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.references :list, null: false, foreign_key: true
      t.integer :position
      t.string :name

      t.timestamps
    end
  end
end
