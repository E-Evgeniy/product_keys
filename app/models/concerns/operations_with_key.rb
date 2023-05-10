# frozen_string_literal: true

# Methods for ProductKey
module OperationsWithKey
  def self.generate_name
    while 0.zero?
      triar_name = (0...4).map { "#{generate_part_name}-" }.join.chop
      puts(triar_name)
      return triar_name unless ProductKey.name_exist(triar_name).exists?
    end
  end

  def self.generate_part_name
    (0...4).map { number_or_symbol }.join
  end

  def self.number_or_symbol
    if rand(0..1).zero?
      rand(0..9)
    else
      (65 + rand(26)).chr
    end
  end
end
