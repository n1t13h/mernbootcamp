const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in db",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save category in DB",
      });
    }
    res.json({
      category,
    });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Category Found",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req,res)=>{
	const category = req.category;
	category.name = req.body.name;
	category.save((err,updatedCategory)=>{
		if(err){
			return res.status(400).json({
				error:"Category Not Updated"
			})
		}
		return res.json(updatedCategory)
	});
}
exports.removeCategory = (req,res)=>{
	const cateogry = req.category;
	name = cateogry.name;
	cateogry.remove((err,category)=>{
		if(err){
			return res.status(400).json({
				error:"Failed to delete this category"
			})
		}
		return res.json({
			message:"Successfully Deleted "+name
		});
	});
}