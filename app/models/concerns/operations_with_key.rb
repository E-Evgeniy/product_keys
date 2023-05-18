# frozen_string_literal: true

# Methods for ProductKey
module OperationsWithKey
  def self.generate_name
    while 0.zero?
      triar_name = (0...4).map { "#{generate_part_name}-" }.join.chop
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

  def self.analiz(keys)
    keys.each do |key|
      working_days(key)
    end
  end

  def self.working_days(key_obj)
    if key_obj.infinite_period
      -1
    else
      analiz_work_days(key_obj)
    end
  end

  def self.analiz_work_days(key_obj)
    if key_obj.duration * (60 * 60 * 24) <= Time.current - key_obj.created_at
      key_obj.status = false
      key_obj.save
      0
    else
      
      delta_time = key_obj.duration * (60 * 60 * 24) - (Time.current - key_obj.created_at)
      calcilation_work_days(delta_time)
    end
  end

  def self.calcilation_work_days(delta_time)
    delta_time = (delta_time / (60 * 60 * 24)).to_i  # 60*60*24 number sec in day
    if delta_time.zero?
      1
    else
      delta_time
    end
  end

  def self.need_duration(pk, duration_need)
    duration = (Time.current - pk.created_at) + duration_need * (60 * 60 * 24)

    (duration / (60 * 60 * 24)).to_i
  end
end
