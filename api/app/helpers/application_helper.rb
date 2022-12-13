module ApplicationHelper
  def paginate(record, page, per_page)
    per_page = per_page.to_i
    page = page.to_i
    return record.offset(per_page*(page-1)).limit(per_page) 
  end
end
