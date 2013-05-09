require 'rake/clean'

MINIFIED = "lineheight.min.js"

CLOBBER.include(MINIFIED)

desc "Build minified javascript file."
task :default => [MINIFIED]

file MINIFIED => ["pnglib.js", "lineheight.js"] do |task|
  open(MINIFIED, "w") do |outs|
    outs.puts compress(join_file_contents(task.prerequisites))
  end
end

def join_file_contents file_list
  file_list.map{|fn| File.open(fn).read}.join(?\n)
end

def compress string
  begin
    require "yui/compressor"
  rescue LoadError
    puts "Can't find `yui-compressor'."
    puts "Try running `gem install yui-compressor'."
    exit
  end

  YUI::JavaScriptCompressor.new.compress(string)
end