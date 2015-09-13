module.exports = function(grunt) {
  grunt.initConfig({
    dirs:{
        lib: 'lib/',
        theme: '../',
        assets:'assets/',
        scss:'./scss/',
        css:'css/',
    },
	bower: {
		install: {
			options: {
				targetDir: './lib',
				layout: 'byComponent'
			}
		}
	},
    copy:{
        bourbon:{
    		files: [{
    			src: 'bourbon/**/*',
    			cwd: '<%= dirs.lib %>',
    			dest: '<%= dirs.scss %>',
    			expand: true
    		}]
	    },
        neat:{
    		files: [{
    			src: 'neat/**/*',
    			cwd: '<%= dirs.lib %>',
    			dest: '<%= dirs.scss %>',
    			expand: true
    		}]
	    }
    },
    sass: {
        dist: {
    		options:{
        		style: 'compressed',
        		compass: false
    		},
    		files: {
    			'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss'
    		}
        }
    },
    autoprefixer: {
      options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      dist: {
  		files: {
  			'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
  		}
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
        }
      }
    },
    watch: {
		options: {
			livereload: true 
		},
        scss: {
            files:['<%= dirs.scss %>*.scss'],
            tasks:['sass','autoprefixer','growl:scss']
        }
    },
	clean: { /* take out the trash */
		options: {
			force: true
		},
		prebuild: ['<%= dirs.scss %>bourbon', '<%= dirs.scss %>neat'],
		postbuild: ['<%= dirs.lib %>']
	},
	growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
		build: {
			title: "grunt",
			message: "Build complete."
		},
		scss: {
			title: "grunt",
			message: "Stylesheets created."
		},
		watch: {
			title: "grunt",
			message: "Watching. Grunt has its eye on you."
		}
	}
  });
  
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('default', ['growl:watch', 'watch']);
  grunt.registerTask('build', ['clean:prebuild','bower','copy','sass','autoprefixer','cssmin', 'growl:build','clean:postbuild']);
};