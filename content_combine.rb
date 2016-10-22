#!/usr/bin/env ruby


require 'strscan'


$comment_regex = '(?://|\#)'


#------------------------------------------------------------------------------
# emit section and exit
#------------------------------------------------------------------------------
if (ARGV[0] == 'emit') && ARGV[1]


  begin
    content_string = File.read(ARGV[1])
  rescue StandardError => e 
    puts e.message
    exit(1)
  end

  regex = %r{
  (?://|\#)\s*emit\s*$
  .*?
  (?://|\#)\s*/emit\s*$
  }xm

  puts content_string.scan(regex)

  exit

end



#------------------------------------------------------------------------------
# convert spaces into &nbsp but only outside tags
#------------------------------------------------------------------------------
def nbsp_line(str)

  scanner = StringScanner.new(str)

  nbsped_string = ''

  until scanner.eos?

    # outside string
    outside = scanner.scan_until(/(?=<)|$/)
    outside.gsub!(/ /, '&nbsp;')
    nbsped_string << outside

    # inside string
    inside = scanner.scan_until(/>/)
    nbsped_string << inside.to_s # to_s for nil case

  end

  nbsped_string

end



#------------------------------------------------------------------------------
# 
#------------------------------------------------------------------------------
def process_code(str)

  return '' unless str
  return '' if str.match(/\A\s*\Z/m) # blank

  # git rid of leading newlines
  str.gsub!(/\A\s*/, '')

  # git rid of trailing newlines
  str.gsub!(/\s*\z/, '')

  div = str.each_line.reduce('') do |accum, line|
    line.chomp!
    # next accum if line.match(/^\s*$/) # blank

    # highlighter match (before nbsp substitution) i.e.  // <! word >
    highlight_regex = %r{<!\s*(.*?)\s*>}
    if match = line.scan(highlight_regex)
      # if highlighter match exists, remove from comment
      line = line.gsub(highlight_regex, '')
    end

    # remove empty comments, might have been a highlighter
    line = line.gsub(%r{(?://|\#)\s*$}, ''); # indenting

    # highlight comments (ignoring escaped quotes), this line before adding any other html
    line = line.gsub(%r{(?<!\\)("|')(.*?)(?<!\\)("|')}, "<span class='string'>\\1\\2\\3</span>")

    # remove quote escaping
    line = line.gsub(%r{\\("|')}, "\\1")

    # # highlighter previous match
    match.flatten.each do |m|
      line = line.gsub(m, "<span class='highlight'>#{m}</span>")
    end


    line = line.gsub(%r{#{$comment_regex}=>}, "<span class='glyphicon glyphicon-arrow-right'></span>")
    line = line.gsub(%r{#{$comment_regex}=x}, "<span class='glyphicon glyphicon-fire' style='color:orange'></span>")
    line = line.gsub(%r{(#{$comment_regex}.*)}, "<span class='comment'>\\1</span>")
    line = '&nbsp;' if line.match(/^\s*$/) # blank
    line = "<div>#{line}</div>"
    line = nbsp_line(line)
    accum += line + "\n"

  end

  "\n<div class='code'>\n#{div}\n</div>"

end



def beautify_basename(basename)

  basename.gsub!(/_|-/, ' ')

  basename.split(' ').map {|w| w[0] = w[0].upcase; w }.join(' ')

end


Dir.glob(["./content/*.js", "./content/*.rb"]) do |content_file|

  puts content_file

  index_string = File.read('index.html') 
  content_string = File.read(content_file)
  basename = File.basename(content_file, File.extname(content_file))
  puts "[converting] #{basename}.html ---> #{basename}.html"


  #------------------------------------------------------------------------------
  # fix some paths because gh-pages don't seem to work with absolute paths to
  # css/js/etc and I don't want to convert everything to Jekyl whatever that means.
  #------------------------------------------------------------------------------
  index_string.gsub!('css/', '../css/')
  index_string.gsub!('js/', '../js/')
  index_string.gsub!('rb/', '../rb/')


  #------------------------------------------------------------------------------
  # remove hide sections
  #------------------------------------------------------------------------------
  regex = %r{
  (?://|\#)\s*hide\s*$
  .*?
  (?://|\#)\s*/hide\s*$
  }xm

  content_string.gsub! regex, ''


  #------------------------------------------------------------------------------
  # remove emit tags
  #------------------------------------------------------------------------------
  regex = %r{(?://|\#)\s*/?emit\s*$}xm
  content_string.gsub! regex, ''


  #------------------------------------------------------------------------------
  # 
  #------------------------------------------------------------------------------
  def process_comment(str)
    "\n<div class='text'>\n#{str}\n</div>"
  end


  #------------------------------------------------------------------------------
  # 
  #------------------------------------------------------------------------------
  output_string = ""
  scnr = StringScanner.new(content_string)
  while code = scnr.scan_until(%r{(/\*|=begin)})
    comment = scnr.scan_until(%r{(\*/|=end)})

    # save for after loop
    post_match = scnr.post_match 

    code.chomp!('/*')
    code.chomp!('=begin')
    comment.chomp!('*/')
    comment.chomp!('=end')

    output_string += process_code(code)
    output_string += process_comment(comment)

  end

  output_string += process_code(post_match)


  #------------------------------------------------------------------------------
  # 
  #------------------------------------------------------------------------------
  index_string.gsub! %r{<NOTES_TITLE>.*</NOTES_TITLE>}, beautify_basename(basename.dup)
  index_string.gsub! %r{<CONTENT>.*</CONTENT>}m, output_string

  File.write("content/#{basename}.html", index_string)

end


